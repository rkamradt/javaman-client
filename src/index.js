import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import soundsFactory from './sounds';
import controllerFactory from './controller';
import Screen from './components/screen';

var handleLogonSubmit = function(data) {
  fetch('https://api.rlksr.com/logon', {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)());
    var canvas = document.getElementById('canvas');
    var logon = document.getElementById('logon');
    var squares = document.getElementById('squares');
    logon.style.display='none';
    canvas.style.display='block';
    var ctx = canvas.getContext('2d');
    var controller = controllerFactory(sounds, ctx, squares);
    controller.init();
  });
}

ReactDOM.render(<Screen handleLogonSubmit={ handleLogonSubmit } />, document.getElementById('screen'));
registerServiceWorker();
