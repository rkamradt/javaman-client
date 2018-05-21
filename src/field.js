/*
 * Copyright 2015 randalkamradt.
 *
 */

export default class Field {
  constructor(ctx, viewsize, squaresize, squares) {
    this.ctx = ctx;
    this.viewsize = viewsize;
    this.squaresize = squaresize;
    this.squares = squares;
    this.field = [];
    this.viewx = 0;
    this.viewy = 0;
    this.maxx = 0;
    this.maxy = 0;
  }
  getMax() {
    return {
      'x': this.maxx,
      'y': this.maxy
    };
  }
  getViewPort() {
    return {
      'x': this.viewx,
      'y': this.viewy
    };
  }
  setWorld(f) {
    this.field = f;
    this.maxx = f.length;
    this.maxy = this.maxx > 0 ? f[0].length : 0;
  }
  ensureCentered(user) {
    const minvbuf = Math.floor(this.viewsize/4);
    const maxvbuf = Math.floor(this.viewsize*3/4);
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
      if(this.viewx > this.maxx-this.viewsize) {
        this.viewx = this.maxx-this.viewsize;
      }
    }
    if(user.cursory < viewminy) {
      this.viewy -= viewminy-user.cursory;
      if(this.viewy < 0) {
        this.viewy = 0;
      }
    } else if(user.cursory > viewmaxy) {
      this.viewy += user.cursory-viewmaxy;
      if(this.viewy > this.maxy-this.viewsize) {
        this.viewy = this.maxy-this.viewsize;
      }
    }
    if(oldy !== this.viewy || oldx !== this.viewx) {
      this.drawField();
    }
  }
  drawField() {
    for(var x = this.viewx; x < this.viewx+this.viewsize && x < this.maxx; x++) {
      for(var y = this.viewy; y < this.viewy+this.viewsize && y < this.maxy; y++) {
        this.drawFieldAt(x, y);
      }
    }
  }
  getFieldToken(x, y) {
    return this.field[x][y];
  }
  drawFieldAt(x, y) {
    this.drawAt(x, y, this.getFieldToken(x,y));
  }
  drawInterim(x1, y1, x2, y2, tick, o) {
    if(x1 === x2 && y1 === y2) {
      return;
    }
    var deltax = (x2-x1)*(tick%this.squaresize+1);
    var deltay = (y2-y1)*(tick%this.squaresize+1);
    var fieldToken = this.getFieldToken(x1,y1);
    x1 -= this.viewx;
    y1 -= this.viewy;
    if(x1 < 0 || x1 >= this.viewsize || y1 < 0 || y1 >= this.viewsize) {
      return;
    }
    this.makeSquare(x1*this.squaresize, y1*this.squaresize, this.getColor(fieldToken));
    this.makeSquare(x1*this.squaresize+deltax, y1*this.squaresize+deltay, this.getColor(o));
  }
  drawAt(x, y, o) {
    x -= this.viewx;
    y -= this.viewy;
    if(x < 0 || x > this.viewsize || y < 0 || y > this.viewsize) {
      return;
    }
    this.makeSquare(x*this.squaresize, y*this.squaresize, this.getColor(o));
  }
  makeSquare(x, y, i) {
    this.ctx.drawImage(this.squares, i*this.squaresize, 0, this.squaresize, this.squaresize, x, y, this.squaresize, this.squaresize);
  }
  getColor(i) {
    return i;
  }
}
