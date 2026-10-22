import { useEffect, useRef } from 'react'
import { useKeycloak } from '../KeycloakContext'
import { useController } from './init.js'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export const useAuth = (canvasRef, squaresRef) => {
  const { keycloak, initialized } = useKeycloak()
  const controllerStarted = useRef(false)

  // Start the game controller once when authenticated
  useEffect(() => {
    if (initialized && keycloak.authenticated && keycloak.token && !controllerStarted.current) {
      controllerStarted.current = true
      useController(keycloak.token, keycloak.tokenParsed?.sub, canvasRef, squaresRef)
    }
  }, [initialized, keycloak.authenticated, keycloak.token])

  // Initialize Google One Tap when not authenticated
  useEffect(() => {
    if (!initialized || keycloak.authenticated) return
    if (!GOOGLE_CLIENT_ID || !window.google?.accounts?.id) return

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      // On credential received, let Keycloak handle Google OAuth —
      // Keycloak already has Google as a Social IDP, so with idpHint
      // it goes straight to Google and returns a Keycloak JWT.
      callback: () => keycloak.login({ idpHint: 'google' }),
      use_fedcm_for_prompt: true,
    })

    // Show the floating One Tap card
    window.google.accounts.id.prompt()

    // Render a fallback "Sign in with Google" button
    const el = document.getElementById('google-signin-btn')
    if (el) {
      window.google.accounts.id.renderButton(el, {
        theme: 'filled_black',
        size: 'medium',
        shape: 'rectangular',
        text: 'signin_with',
      })
    }
  }, [initialized, keycloak.authenticated])

  return keycloak?.authenticated ?? false
}
