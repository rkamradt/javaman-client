/*
 * Copyright 2015 randalkamradt.
 *
 */

export default class Server {
  constructor(controller, accessToken) {
    this.controller = controller
    this.accessToken = accessToken
  }

  createWorld() {
      console.log('Authorization ' + `Bearer ${this.accessToken}`)
      fetch(process.env.REACT_APP_SERVER_URL + '/api/world', {
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          authorization: `Bearer ${this.accessToken}`
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        const contentType = response.headers.get("Content-Type")
        if(contentType && contentType.includes("application/json")) {
          return response.json()
        }
        throw new TypeError("Oops, we haven't got JSON!")
      })
      .then(json => this.controller.beginSuccess(json))
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'))
    }
    sync(command) {
      let url = 'world/go'
      if(command) {
        url += '/' + command
      }
      fetch(process.env.REACT_APP_SERVER_URL + '/api/'+url, {
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          authorization: `Bearer ${this.accessToken}`
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'))
    }
    reset() {
      fetch(process.env.REACT_APP_SERVER_URL + '/api/world/reset', {
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          authorization: `Bearer ${this.accessToken}`
        },
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
      .catch(error => this.controller.error('error getting world from server error = ' + error, 'could not contact server'))
    }
}
