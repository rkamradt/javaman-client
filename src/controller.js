/*
 * Copyright 2015 randalkamradt.
 */
import Field from './field'
import Server from './server'

export let theController = null

export function setController(c) {
  theController = c
}

export default class Controller {
  constructor(sounds, ctx, squares, accessToken, userId) {
    this.sounds = sounds
    this.ctx = ctx
    this.squares = squares
    this.field = new Field(ctx, squares, this)
    this.server = new Server(this, accessToken, userId)
    this.server.createWorld()
  }

  start() {
    this.ticker = window.setInterval(() => this.tick(), 200)
    const step = (timestamp) => {
      if (this.ticker) {
        this.field.animate(timestamp)
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  stop() {
    window.clearInterval(this.ticker)
    this.ticker = null
  }

  beginSuccess(data) {
    if (data) {
      this.field.setWorld(data)
      this.server.sync()
    }
  }

  stopSuccess(_data) {
    this.stop()
  }

  syncSuccess(data) {
    if (data) {
      this.field.setState(data)
      if (!this.ticker) {
        this.start()
      }
    }
  }

  resetSuccess(_data) {
    this.server.createWorld()
  }

  error(logMessage, alertMessage) {
    if (logMessage) console.log(logMessage)
    if (alertMessage) console.log(alertMessage)
  }

  actionStart(command) {
    this.leftdown = false
    this.rightdown = false
    this.updown = false
    this.downdown = false
    switch (command) {
      case 'left':   this.leftdown = true;  break
      case 'right':  this.rightdown = true; break
      case 'up':     this.updown = true;    break
      case 'down':   this.downdown = true;  break
      case 'start':  if (!this.ticker) this.start(); break
      case 'stop':   this.stop(); break
      case 'reset':  this.reset(); break
      default: break
    }
  }

  actionStop(command) {
    switch (command) {
      case 'left':  this.leftdown = false;  break
      case 'right': this.rightdown = false; break
      case 'up':    this.updown = false;    break
      case 'down':  this.downdown = false;  break
      default: break
    }
  }

  reset() {
    this.stop()
    this.server.reset()
  }

  tick() {
    let nextMove
    if (this.leftdown)       nextMove = 'left'
    else if (this.rightdown) nextMove = 'right'
    else if (this.updown)    nextMove = 'up'
    else if (this.downdown)  nextMove = 'down'

    if (nextMove) {
      if (this.field.collision(nextMove)) {
        nextMove = ''
        this.sounds.beep()
      } else {
        this.sounds.bloop()
      }
    }
    this.server.sync(nextMove)
  }

  logoff() {
    this.server.logoff()
    this.stop()
  }
}
