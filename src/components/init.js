import soundsFactory from '../sounds'
import Controller from '../controller'
import { useState, useEffect } from 'react'

export const useController = (accessToken) => {
  const [controller, setController] = useState(null)

  useEffect(() => {
    if (accessToken) {
      console.log('setting controller')
      var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)())
      var canvas = document.getElementById('canvas')
      var squares = document.getElementById('squares')
      canvas.style.display='block'
      var ctx = canvas.getContext('2d')
      var controller = new Controller(sounds, ctx, squares, accessToken)
      setController(controller)
    } else {
      setController(null);
    }
  }, [controller, accessToken])

  return [controller]
}
