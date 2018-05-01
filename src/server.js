/*
 * Copyright 2015 randalkamradt.
 *
 */

export default class Server {
  constructor(controller) {
    this.controller = controller;
    this.errorCount = 0;
  }

  createWorld() {
      fetch('http://localhost:9999/world', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        const contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          this.errorCount = 0;
          return response.json();
        }
        this.errorCount++;
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .catch(error => this.controller.error('error getting world from server', 'could not contact server'))
      .then(json => this.controller.beginSuccess(json));
    }
    sync(command) {
      let url = 'world/go';
      if(command) {
        url += '/' + command;
      }
      fetch('http://localhost:9999/'+url, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          this.errorCount = 0;
          return response.json();
        }
        this.errorCount++;
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .catch(error => this.controller.error('error getting world from server', 'could not contact server'))
      .then(json => this.controller.syncSuccess(json));
    }
    reset() {
      fetch('http://localhost:9999/world/reset', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          this.errorCount = 0;
          return response.json();
        }
        this.errorCount++;
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .catch(error => this.controller.error('error getting world from server', 'could not contact server'))
      .then(json => this.controller.resetSuccess(json));
    }
}
