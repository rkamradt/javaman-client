/*
 * Copyright 2015 randalkamradt.
 *
 */

 const VIEWSIZE = 12;
 const SQUARESIZE = 20;

export default class Field {
  constructor(ctx, squares, controller) {
    this.squares = squares
    this.controller = controller
    this.maxx = 0
    this.maxy = 0
    this.uid = null
    this.users = {}
    this.theUser = {}
    this.ctx = ctx
    this.squares = squares
    this.field = []
    this.viewx = 0
    this.viewy = 0
  }
  setWorld(data) {
    console.log('in setWorld', data)
    this.field = data.world
    this.maxx = this.field.length;
    this.maxy = this.maxx > 0 ? this.field[0].length : 0;
    this.uid = data.uid
    this.users = data.users;
    this.drawField();
  }
  setState(data) {
    this.users = data.users
    this.theUser = null
    if(this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        console.log('comparing ' + key + ' with ' + this.uid)
        if(key === this.uid) {
          this.theUser = user;
          break;
        }
      }
    }
    if(!this.theUser) {
      console.log('no user found')
      return
    }
    if(this.theUser.previousx !== this.theUser.cursorx ||
        this.theUser.previousy !== this.theUser.cursory) {
      this.ensureCentered(this.theUser);
    }
    if(Math.abs(this.theUser.previousx-this.theUser.cursorx) > 1) {
      this.theUser.previousx = this.theUser.cursorx; // prevent 'jumping'
    }
    if(Math.abs(this.theUser.previousy-this.theUser.cursory) > 1) {
      this.theUser.previousy = this.theUser.cursory; // prevent 'jumping'
    }
  }
  ensureCentered(user) {
    const minvbuf = Math.floor(VIEWSIZE/4);
    const maxvbuf = Math.floor(VIEWSIZE*3/4);
    const viewminx = this.viewx+(minvbuf);
    const viewminy = this.viewy+(minvbuf);
    const viewmaxx = this.viewx+(maxvbuf);
    const viewmaxy = this.viewy+(maxvbuf);
    const oldx = this.viewx;
    const oldy = this.viewy;
    if(user.cursorx < viewminx) {
      this.viewx -= viewminx-user.cursorx;
      if(this.viewx < 0) {
        this.viewx = 0;
      }
    } else if(user.cursorx > viewmaxx) {
      this.viewx += user.cursorx-viewmaxx;
      if(this.viewx > this.maxx-VIEWSIZE) {
        this.viewx = this.maxx-VIEWSIZE;
      }
    }
    if(user.cursory < viewminy) {
      this.viewy -= viewminy-user.cursory;
      if(this.viewy < 0) {
        this.viewy = 0;
      }
    } else if(user.cursory > viewmaxy) {
      this.viewy += user.cursory-viewmaxy;
      if(this.viewy > this.maxy-VIEWSIZE) {
        this.viewy = this.maxy-VIEWSIZE;
      }
    }
    if(oldy !== this.viewy || oldx !== this.viewx) {
      this.drawField();
    }
  }
  collision(direction) {
    console.log('in collision detection')
    if(!this.theUser) {
      return true
    }
    var x = this.theUser.cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
    var y = this.theUser.cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
    return (x < 0 || x >= this.maxx || y < 0 || y >= this.maxy || this.field[x][y] === 0);
  }
  undrawUsers() {
    if(this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        if(user) {
          this.field.drawAt(user.cursorx, user.cursory, this.field[user.cursorx][user.cursory]);
        }
      }
    }
  }
  drawUsers() {
    if(this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        if(user) {
          this.field.drawAt(user.cursorx, user.cursory, 4);
        }
      }
    }
  }
  drawAnimation(user, tick) {
    if(user) {
      if(tick%SQUARESIZE === 0) {
        this.drawAt(user.previousx, user.previousy, this.field[user.previousx][user.previousy])
        user.previousx = user.cursorx;
        user.previousy = user.cursory;
        this.drawAt(user.cursorx, user.cursory, 4);
      } else {
        this.drawInterim(user.previousx, user.previousy, user.cursorx, user.cursory, tick, 4);
      }
    }
  }
  animate(tick) {
    if(this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        this.drawAnimation(user, tick)
      }
    }
  }
  drawField() {
    for(var x = this.viewx; x < this.viewx+VIEWSIZE && x < this.maxx; x++) {
      for(var y = this.viewy; y < this.viewy+VIEWSIZE && y < this.maxy; y++) {
        this.drawAt(x, y, this.field[x][y]);
      }
    }
  }
  drawInterim(x1, y1, x2, y2, tick, o) {
    if(x1 === x2 && y1 === y2) {
      return;
    }
    var deltax = (x2-x1)*(tick%SQUARESIZE+1);
    var deltay = (y2-y1)*(tick%SQUARESIZE+1);
    var fieldToken = this.field[x1][y1];
    x1 -= this.viewx;
    y1 -= this.viewy;
    if(x1 < 0 || x1 >= VIEWSIZE || y1 < 0 || y1 >= VIEWSIZE) {
      return;
    }
    this.makeSquare(x1*SQUARESIZE, y1*SQUARESIZE, this.getColor(fieldToken));
    this.makeSquare(x1*SQUARESIZE+deltax, y1*SQUARESIZE+deltay, this.getColor(o));
  }
  drawAt(x, y, o) {
    x -= this.viewx;
    y -= this.viewy;
    if(x < 0 || x > VIEWSIZE || y < 0 || y > VIEWSIZE) {
      return;
    }
    this.makeSquare(x*SQUARESIZE, y*SQUARESIZE, this.getColor(o));
  }
  makeSquare(x, y, i) {
    this.ctx.drawImage(this.squares, i*SQUARESIZE, 0, SQUARESIZE, SQUARESIZE, x, y, SQUARESIZE, SQUARESIZE);
  }
  getColor(i) {
    return i;
  }
}
