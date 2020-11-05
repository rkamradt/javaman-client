/*
 * Copyright 2015 randalkamradt.
 *
 */
import State from './state'
import Server from './server'
import Handler from './handler'

var theController

export default class Controller {
  constructor(sounds, ctx, squares, accessToken) {
    theController = this
    this.sounds = sounds
    this.ctx = ctx
    this.squares = squares
    this.state = new State(sounds, ctx, squares, this)
    this.server = new Server(this, accessToken)
    this.handler = new Handler(this)
    var canvas = document.getElementById('canvas')
    canvas.addEventListener("keydown", this.keyDown)
    canvas.addEventListener("keyup", this.keyUp);
    var button = document.getElementById('upbutton')
    this.handler.bindButton(button,'up')
    button = document.getElementById('leftbutton')
    this.handler.bindButton(button,'left')
    button = document.getElementById('rightbutton')
    this.handler.bindButton(button,'right')
    button = document.getElementById('downbutton')
    this.handler.bindButton(button,'down')
    button = document.getElementById('resetbutton')
    this.handler.bindButton(button,'reset')
    button = document.getElementById('stopbutton')
    this.handler.bindButton(button,'stop')
    button = document.getElementById('startbutton')
    this.handler.bindButton(button,'start')

    this.server.createWorld()
  }
  start() {
    this.ticker = window.setInterval(Controller.internalTick, 200)
    window.requestAnimationFrame(Controller.internalStep) // start animation
  }
  stop() {
    window.clearInterval(this.ticker)
    this.ticker = null
  }
  beginSuccess(data) {
    if(data) {
      this.state.setWorldState(data)
      this.server.sync()
    }
  }
  stopSuccess(data) {
    this.stop()
  }
  syncSuccess(data) {
    if(data) {
      this.state.setState(data)
      if(!this.ticker) {
        this.start()
      }
    }
  }
  resetSuccess(data) {
    this.server.createWorld()
  }
  error(logMessage, alertMessage) {
    if(logMessage) {
      console.log(logMessage)
    }
  }
  actionStart(command) {
    this.leftdown = false  // keydown flags are mutually exclusive
    this.rightdown = false
    this.updown = false
    this.downdown = false
    switch(command) {
      case 'left':
        this.leftdown = true
        break;
      case 'right':
        this.rightdown = true
        break;
      case 'up':
        this.updown = true
        break;
      case 'down':
        this.downdown = true
        break;
      case 'start':
        if(!this.ticker) {
          this.start()
        }
        break;
      case 'stop':
        this.stop()
        break;
      case 'reset':
        this.reset()
        break;
      default:
        break;
    }
  }
  actionStop(command) {
    switch(command) {
      case 'left':
        this.leftdown = false
        break;
      case 'right':
        this.rightdown = false
        break;
      case 'up':
        this.updown = false
        break;
      case 'down':
        this.downdown = false
        break;
      default:
        break;
    }
  }
  reset() {
    this.stop()
    this.server.reset()
  }
  tick() {
    var nextMove
    if(!this.ticks) {
      this.ticks = 0;
    }
    if(this.ticks%10 === 0) { // every 10th tick sync
      if(this.ticks%20 === 0) {
        if(this.leftdown) {
          nextMove = 'left'
        } else if(this.rightdown) {
          nextMove = 'right'
        } else if(this.updown) {
          nextMove = 'up'
        } else if(this.downdown) {
          nextMove = 'down'
        }
        if(nextMove) {
          if(this.state.collision(nextMove)) {
            nextMove = ''
            this.sounds.beep()
          } else {
            this.sounds.bloop()
          }
        }
      }
      this.server.sync(nextMove)
    }
    this.ticks++
  }
  static internalStep(timestamp) {
    if(theController.ticker) { // don't continue animating if the ticker is stopped
      theController.state.animate(theController.ticks)
      window.requestAnimationFrame(Controller.internalStep)
    }
  }

  static internalTick() {
    theController.tick()
  }

}
