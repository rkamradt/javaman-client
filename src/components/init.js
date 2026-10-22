import soundsFactory from '../sounds'
import Controller from '../controller'

export const useController = (accessToken, userId) => {

  if (accessToken) {
    var sounds = soundsFactory()
    var canvas = document.getElementById('canvas')
    var squares = document.getElementById('squares')
    canvas.style.display='block'
    var ctx = canvas.getContext('2d')
    new Controller(sounds, ctx, squares, accessToken, userId)
  }
  return accessToken
}
