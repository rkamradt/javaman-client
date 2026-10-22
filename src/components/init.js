import soundsFactory from '../sounds'
import Controller from '../controller'

export const useController = (accessToken, userId, canvasRef, squaresRef) => {
  if (accessToken && canvasRef.current) {
    const sounds = soundsFactory()
    const ctx = canvasRef.current.getContext('2d')
    new Controller(sounds, ctx, squaresRef.current, accessToken, userId)
  }
  return accessToken
}
