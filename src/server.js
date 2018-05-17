/*
 * Copyright 2015 randalkamradt.
 *
 */

export default class Server {
  constructor(controller) {
    this.controller = controller;
  }

  createWorld() {
      fetch('https://api.rlksr.com/api/world', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
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
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(json => this.controller.beginSuccess(json))
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'));
    }
    sync(command) {
      let url = 'world/go';
      if(command) {
        url += '/' + command;
      }
      fetch('https://api.rlksr.com/api/'+url, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
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
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(json => this.controller.syncSuccess(json))
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'));
    }
    reset() {
      fetch('https://api.rlksr.com/api/world/reset', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
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
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(json => this.controller.resetSuccess(json))
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'));
    }
}
