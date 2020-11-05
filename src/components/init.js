import soundsFactory from '../sounds';
import Controller from '../controller';
import { useState, useEffect } from 'react';

export const useController = (user) => {
  const [controller, setController] = useState(null)

  useEffect(() => {
    if (user) {
      console.log('setting controller')
      var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)())
      var canvas = document.getElementById('canvas')
      var logon = document.getElementById('logon')
      var squares = document.getElementById('squares')
      logon.style.display='none'
      canvas.style.display='block'
      var ctx = canvas.getContext('2d')
      setController(new Controller(sounds, ctx, squares))
    } else {
      setController(null);
    }
  }, [controller])

  return [controller];
};
