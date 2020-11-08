/*
 * Copyright 2015 randalkamradt.
 *
 */
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

export default class Handler {
  constructor(controller) {
    console.log('creating handler')
    this.controller = controller;
  }
  keyUp(e) {
    this.controller.actionStop(this._xlateKey(e.keyCode));
  }
  keyDown(e) {
    this.controller.actionStart(this._xlateKey(e.keyCode));
  }
  actionEnd(e, command) {
    console.log('end command ' + command)
    e.preventDefault();
    this.controller.actionStop(command);
  }
  actionStart(e, command) {
    console.log('start command ' + command)
    e.preventDefault();
    this.controller.actionStart(command);
  }
  bindButton(button, command) {
    console.log('in bindButton ' + command)
    button.addEventListener("mousedown", event => this.actionStart(event, command));
    button.addEventListener("touchstart", event => this.actionStart(event, command));
    button.addEventListener("mouseup", event => this.actionEnd(event, command));
    button.addEventListener("touchend", event => this.actionEnd(event, command));

  }
  _xlateKey(key) {
    console.log('translating key ' + key)
    var command;
    switch(key) {
      case LEFT:
        command = 'left';
        break;
      case RIGHT:
        command = 'right';
        break;
      case UP:
        command = 'up';
        break;
      case DOWN:
        command = 'down';
        break;
      default:
        command = '';
        break;
    }
    return command;
  }

}
