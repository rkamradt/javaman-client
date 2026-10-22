import { useEffect, useRef } from 'react'
import soundsFactory from './sounds'
import Controller, { setController } from './controller'

export function useGameController(keycloak, initialized, canvasRef, squaresRef) {
  const controllerRef = useRef(null)

  useEffect(() => {
    if (!initialized || !keycloak.authenticated || !keycloak.token) return
    if (!canvasRef?.current || controllerRef.current) return

    const sounds = soundsFactory()
    const ctx = canvasRef.current.getContext('2d')
    const controller = new Controller(
      sounds, ctx, squaresRef?.current,
      keycloak.token, keycloak.tokenParsed?.sub
    )
    controllerRef.current = controller
    setController(controller)

    return () => {
      controller.stop()
      setController(null)
      controllerRef.current = null
    }
  }, [initialized, keycloak.authenticated, keycloak.token])

  return controllerRef
}
