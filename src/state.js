/*
 * Copyright 2015 randalkamradt.
 *
 */
import Field from './field';

 const VIEWSIZE = 12;
 const SIZE = 20;

export default class State {
  constructor(sound, ctx, squares, controller) {
    this.squares = squares;
    this.controller = controller;
    this.field = new Field(ctx, VIEWSIZE, SIZE, squares);
    this.maxx = 0;
    this.maxy = 0;
    this.users = {};
  }
  setWorldState(data) {
    this.field.setWorld(data.world);
    this.users = data.users;
    const max = this.field.getMax();
    this.maxx = max.x;
    this.maxy = max.y;
    this.field.drawField();
  }
  setWorld(f) {
    this.field.setWorld(f);
  }
  setState(data) {
    this.users = data.users
    if(!this.users) {
      return;
    }
    const theUser = data.users[data.uid]
    if(!theUser) {
      return
    }
    if(theUser.previousx !== theUser.cursorx ||
        theUser.previousy !== theUser.cursory) {
      this.field.ensureCentered(theUser);
    }
    if(Math.abs(theUser.previousx-theUser.cursorx) > 1) {
      theUser.previousx = theUser.cursorx; // prevent 'jumping'
    }
    if(Math.abs(theUser.previousy-theUser.cursory) > 1) {
      theUser.previousy = theUser.cursory; // prevent 'jumping'
    }
  }
  collision(direction, user) {
    var x = user.cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
    var y = user.cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
    return (x < 0 || x >= this.maxx || y < 0 || y >= this.maxy || this.field.getFieldToken(x,y) === 0);
  }
  undrawUsers() {
    if(this.users) {
      for (const [key, user] of Object.entries(this.users)) {
        if(user) {
          this.field.drawFieldAt(user.cursorx, user.cursory);
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
    if(this.users && this.field) {
      if(tick%SIZE === 0) {
        this.field.drawFieldAt(user.previousx, user.previousy);
        user.previousx = user.cursorx;
        user.previousy = user.cursory;
        this.field.drawAt(user.cursorx, user.cursory, 4);
      } else {
        this.field.drawInterim(user.previousx, user.previousy, user.cursorx, user.cursory, tick, 4);
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

 }
