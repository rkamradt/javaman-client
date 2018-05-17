/*
 * Copyright 2015 randalkamradt.
 *
 */
import Field from './field';

 const VIEWSIZE = 12;
 const SIZE = 20;

export default class State {
  constructor(sound, ctx, squares, controller) {
    this.sound = sound;
    this.ctx = ctx;
    this.squares = squares;
    this.controller = controller;
    this.users = [];
    this.uid = -1;
    this.field = new Field(ctx, VIEWSIZE, SIZE, squares);
    this.maxx = 0;
    this.maxy = 0;
  }
  setWorldState(data) {
    console.log("in setWorldState uid = " + data.uid);
    this.field.setWorld(data.world);
    const max = this.field.getMax();
    this.maxx = max.x;
    this.maxy = max.y;
    this.field.drawField();
    this.uid = data.uid;
  }
  setWorld(f) {
    this.field.setWorld(f);
  }
  setState(data) {
    console.log("in setState uid = " + this.uid);
    for(var i = 0; i < data.users.length; i++) {
      if(!this.users[i]) {
        this.users[i] = {
          cursorx: 0,
          previousx: 0,
          cursory: 0,
          previousy: 0
        };
      }
      this.users[i].cursorx = data.users[i].cursorx;
      this.users[i].cursory = data.users[i].cursory;
    }
    const user = this.users[this.uid];
    if(user.previousx !== user.cursorx ||
        user.previousy !== user.cursory) {
      this.field.ensureCentered(this.users[this.uid]);
    }
    if(Math.abs(user.previousx-user.cursorx) > 1) {
      user.previousx = user.cursorx; // prevent 'jumping'
    }
    if(Math.abs(user.previousy-user.cursory) > 1) {
      user.previousy = user.cursory; // prevent 'jumping'
    }
  }
  collision(direction) {
    if(this.uid >= this.users.length) {
      return;
    }
    var x = this.users[this.uid].cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
    var y = this.users[this.uid].cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
    return (x < 0 || x >= this.maxx || y < 0 || y >= this.maxy || this.field.getFieldToken(x,y) === 0);
  }
  undrawUsers() {
    this.users.forEach(function(user) {
      this.field.drawFieldAt(user.cursorx, user.cursory);
    });
  }
  drawUsers() {
    this.users.forEach(function(user) {
      this.field.drawAt(user.cursorx, user.cursory, 4);
    });
  }
  drawAnimation(user, tick) {
    if(tick%SIZE === 0) {
      this.field.drawFieldAt(user.previousx, user.previousy);
      user.previousx = user.cursorx;
      user.previousy = user.cursory;
      this.field.drawAt(user.cursorx, user.cursory, 4);
    } else {
      this.field.drawInterim(user.previousx, user.previousy, user.cursorx, user.cursory, tick, 4);
    }
  }
  animate(tick) {
    this.users.forEach(user => this.drawAnimation(user, tick))
  }

 }
