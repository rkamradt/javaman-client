import soundsFactory from '../sounds'
import Controller from '../controller'

export const useController = (accessToken) => {
  console.log('in useController')

  if (accessToken) {
    console.log('setting controller')
    var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)())
    var canvas = document.getElementById('canvas')
    var squares = document.getElementById('squares')
    canvas.style.display='block'
    var ctx = canvas.getContext('2d')
    new Controller(sounds, ctx, squares, accessToken)
  }
  return accessToken
}
