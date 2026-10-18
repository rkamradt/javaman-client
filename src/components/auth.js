import { useEffect } from 'react'
import { useKeycloak } from '../KeycloakContext'
import { useController } from './init.js'

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak()

  useEffect(() => {
    if (initialized && keycloak.authenticated && keycloak.token) {
      useController(keycloak.token, keycloak.tokenParsed?.sub)
    }
  }, [initialized, keycloak.authenticated, keycloak.token])

  return keycloak?.authenticated ?? false
}
