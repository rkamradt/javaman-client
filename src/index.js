import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import soundsFactory from './sounds';
import Controller from './controller';
import Screen from './components/screen';

var handleLogonSubmit = function(data) {
  fetch('api/logon', {
    body: JSON.stringify(data), // must match 'Content-Type' header
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
    console.log(response);
    var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)());
    var canvas = document.getElementById('canvas');
    var logon = document.getElementById('logon');
    var squares = document.getElementById('squares');
    logon.style.display='none';
    canvas.style.display='block';
    var ctx = canvas.getContext('2d');
    var controller = new Controller(sounds, ctx, squares);
  })
  .catch(error => this.controller.error('error logging on to server error = ' + error, 'could not contact server'));
};

ReactDOM.render(
  <Screen handleLogonSubmit={ handleLogonSubmit } />
  , document.getElementById('screen'));
