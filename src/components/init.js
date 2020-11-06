import soundsFactory from '../sounds'
import Controller from '../controller'

export const useController = (accessToken) => {

  if (accessToken) {
    var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)())
    var canvas = document.getElementById('canvas')
    var squares = document.getElementById('squares')
    canvas.style.display='block'
    var ctx = canvas.getContext('2d')
    new Controller(sounds, ctx, squares, accessToken)
  }
  return accessToken
}
