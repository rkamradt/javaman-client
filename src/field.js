/*
 * Copyright 2015 randalkamradt.
 */

const VIEWSIZE = 12;
const SQUARESIZE = 20;
const ANIM_DURATION_MS = 160;

export default class Field {
  constructor(ctx, squares, controller) {
    this.controller = controller
    this.maxx = 0
    this.maxy = 0
    this.uid = null
    this.users = {}
    this.previous = new Map()
    this.theUser = null   // fix #4: was {}, truthy but had no cursorx
    this.ctx = ctx
    this.squares = squares
    this.field = []
    this.viewx = 0
    this.viewy = 0
  }

  setWorld(data) {
    console.log('in setWorld', data)
    this.field = data.world
    this.maxx = this.field.length
    this.maxy = this.maxx > 0 ? this.field[0].length : 0
    this.uid = data.uid
    this.users = data.users
    if (this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        this.previous.set(key, { x: user.cursorx, y: user.cursory, movedAt: undefined })
      }
    }
    this.drawField()
  }

  setState(data) {
    const now = performance.now()
    this.users = data.users
    this.theUser = null
    if (this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        if (key === this.uid) {
          this.theUser = user
        }
        // fix #3/5: guard on missing previous entry; stamp movedAt for animation
        const prev = this.previous.get(key)
        if (prev && (prev.x !== user.cursorx || prev.y !== user.cursory)) {
          prev.movedAt = now
        } else if (!prev) {
          this.previous.set(key, { x: user.cursorx, y: user.cursory, movedAt: undefined })
        }
      }
    }
    if (!this.theUser) {
      console.log('no user found')
      return
    }
    const prev = this.previous.get(this.uid)  // fix #3: guard before accessing
    if (prev && (prev.x !== this.theUser.cursorx || prev.y !== this.theUser.cursory)) {
      this.ensureCentered(this.theUser)
    }
  }

  ensureCentered(user) {
    const minvbuf = Math.floor(VIEWSIZE / 4)
    const maxvbuf = Math.floor(VIEWSIZE * 3 / 4)
    const oldx = this.viewx
    const oldy = this.viewy

    if (user.cursorx < this.viewx + minvbuf) {
      this.viewx = Math.max(0, this.viewx - (this.viewx + minvbuf - user.cursorx))
    } else if (user.cursorx > this.viewx + maxvbuf) {
      this.viewx = Math.min(this.maxx - VIEWSIZE, this.viewx + (user.cursorx - this.viewx - maxvbuf))
    }

    if (user.cursory < this.viewy + minvbuf) {
      this.viewy = Math.max(0, this.viewy - (this.viewy + minvbuf - user.cursory))
    } else if (user.cursory > this.viewy + maxvbuf) {
      this.viewy = Math.min(this.maxy - VIEWSIZE, this.viewy + (user.cursory - this.viewy - maxvbuf))
    }

    if (oldx !== this.viewx || oldy !== this.viewy) {
      this.drawField()
    }
  }

  collision(direction) {
    if (!this.theUser) {  // fix #4: null check now works correctly
      return true
    }
    const x = this.theUser.cursorx + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0)
    const y = this.theUser.cursory + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0)
    return (x < 0 || x >= this.maxx || y < 0 || y >= this.maxy || this.field[x][y] === 0)
  }

  // fix #5: timestamp-based smooth animation replacing tick-counter interpolation
  animate(timestamp) {
    if (!this.users) return
    for (const [, user] of Object.entries(this.users)) {
      this.drawAnimation(user, timestamp)
    }
  }

  drawAnimation(user, timestamp) {
    if (!user) return
    const prev = this.previous.get(user.uid)
    if (!prev) return

    if (prev.x === user.cursorx && prev.y === user.cursory) {
      this.drawAt(user.cursorx, user.cursory, 4)
      return
    }

    const elapsed = prev.movedAt !== undefined ? timestamp - prev.movedAt : ANIM_DURATION_MS
    const t = Math.min(elapsed / ANIM_DURATION_MS, 1)

    if (t >= 1) {
      // snap: erase old position, draw at new
      this.drawAt(prev.x, prev.y, this.field[prev.x][prev.y])
      this.drawAt(user.cursorx, user.cursory, 4)
      prev.x = user.cursorx
      prev.y = user.cursory
      prev.movedAt = undefined
    } else {
      // smooth interpolation in view-space pixels
      const vx1 = prev.x - this.viewx
      const vy1 = prev.y - this.viewy
      const dx = (user.cursorx - prev.x) * SQUARESIZE
      const dy = (user.cursory - prev.y) * SQUARESIZE
      const px = vx1 * SQUARESIZE + dx * t
      const py = vy1 * SQUARESIZE + dy * t

      // erase previous tile
      if (vx1 >= 0 && vx1 < VIEWSIZE && vy1 >= 0 && vy1 < VIEWSIZE) {
        this.makeSquare(vx1 * SQUARESIZE, vy1 * SQUARESIZE, this.getColor(this.field[prev.x][prev.y]))
      }
      // fix #2: bounds-check interpolated pixel position before drawing
      if (px >= 0 && px < VIEWSIZE * SQUARESIZE && py >= 0 && py < VIEWSIZE * SQUARESIZE) {
        this.makeSquare(px, py, this.getColor(4))
      }
    }
  }

  drawField() {
    for (let x = this.viewx; x < this.viewx + VIEWSIZE && x < this.maxx; x++) {
      for (let y = this.viewy; y < this.viewy + VIEWSIZE && y < this.maxy; y++) {
        this.drawAt(x, y, this.field[x][y])
      }
    }
  }

  drawAt(x, y, o) {
    const vx = x - this.viewx
    const vy = y - this.viewy
    // fix #1: was > VIEWSIZE (off-by-one), should be >= VIEWSIZE
    if (vx < 0 || vx >= VIEWSIZE || vy < 0 || vy >= VIEWSIZE) {
      return
    }
    this.makeSquare(vx * SQUARESIZE, vy * SQUARESIZE, this.getColor(o))
  }

  makeSquare(x, y, i) {
    this.ctx.drawImage(this.squares, i * SQUARESIZE, 0, SQUARESIZE, SQUARESIZE, x, y, SQUARESIZE, SQUARESIZE)
  }

  getColor(i) {
    return i
  }
}
