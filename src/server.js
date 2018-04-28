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
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(myJson) {
        controller.beginSuccess(myJson);
      });
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
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
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
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
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
