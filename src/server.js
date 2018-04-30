/*
 * Copyright 2015 randalkamradt.
 *
 */

var logError = function(xhr, status, err) {
  console.log(status + ' ' + err);
};


module.exports = function(controller) {
  var errorCount = 0; // used to stop after so main server failures
  return {
    'createWorld': function() {
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
        console.log("Headers: " + response.headers.get("Content-Type"));
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .catch(error => controller.error('error getting world from server', 'could not contact server'))
      .then(json => controller.beginSuccess(json));
    },
    'sync': function(command) {
      var url = 'world/go';
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
        return response.json();
      })
      .then(function(myJson) {
        controller.syncSuccess(myJson);
        errorCount = 0;
      });
    },
    'reset': function() {
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
        return response.json();
      })
      .then(function(myJson) {
        controller.resetSuccess(myJson);
      });
    }
  };
};
