/*
 * Copyright 2015 randalkamradt.
 */
import Field from './field'
import Server from './server'
import Handler from './handler'

export var theController

export default class Controller {
  constructor(sounds, ctx, squares, accessToken) {
    console.log('in controller constructor the controller = ', theController)
    theController = this
    this.sounds = sounds
    this.ctx = ctx
    this.squares = squares
    this.field = new Field(ctx, squares, this)
    this.server = new Server(this, accessToken)
    this.handler = new Handler(this)
    var canvas = document.getElementById('canvas')
    canvas.addEventListener("keydown", this.keyDown)
    canvas.addEventListener("keyup", this.keyUp)
    var button = document.getElementById('upbutton')
    this.handler.bindButton(button, 'up')
    button = document.getElementById('leftbutton')
    this.handler.bindButton(button, 'left')
    button = document.getElementById('rightbutton')
    this.handler.bindButton(button, 'right')
    button = document.getElementById('downbutton')
    this.handler.bindButton(button, 'down')
    button = document.getElementById('resetbutton')
    this.handler.bindButton(button, 'reset')
    button = document.getElementById('stopbutton')
    this.handler.bindButton(button, 'stop')
    button = document.getElementById('startbutton')
    this.handler.bindButton(button, 'start')
    this.server.createWorld()
  }

  start() {
    // fix #6: was setInterval(200) with move every 20 ticks = 4 sec between moves
    this.ticker = window.setInterval(Controller.internalTick, 200)
    window.requestAnimationFrame(Controller.internalStep)
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

  stopSuccess(data) {
    this.stop()
  }

  syncSuccess(data) {
    if (data) {
      console.log('data returned ', data)
      this.field.setState(data)
      if (!this.ticker) {
        this.start()
      }
    }
  }

  resetSuccess(data) {
    this.server.createWorld()
  }

  error(logMessage, alertMessage) {
    if (logMessage) console.log(logMessage)
    if (alertMessage) console.log(alertMessage)
    throw new Error()
  }

  actionStart(command) {
    console.log('actionStart ' + command)
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
    console.log('actionStop ' + command)
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
    // fix #6: move + sync every tick (200ms) instead of every 20/10 ticks (4sec/2sec)
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

  // fix #5: pass requestAnimationFrame timestamp to field.animate
  static internalStep(timestamp) {
    if (theController.ticker) {
      theController.field.animate(timestamp)
      window.requestAnimationFrame(Controller.internalStep)
    }
  }

  static internalTick() {
    theController.tick()
  }

  logoff() {
    this.server.logoff()
    this.stop()
  }
}
