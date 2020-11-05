import { useState, useEffect } from 'react';
import { useController } from './init.js'

export const useAuth = (auth) => {
  const [authenticated, setAuthenticated] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  const setAndReturnAccessToken = (accessToken) => {
    console.log('setting accessToken ' + accessToken)
    setAccessToken(accessToken)
    return accessToken
  }

  useEffect(() => {
    auth.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    })
  })

  useEffect(() => {
    if (authenticated) {
      setAccessToken(null)
      console.log('getting accessToken')
      auth.getAccessToken()
        .then(setAndReturnAccessToken)
        .then(useController)
        .then(setAccessToken)
    } else {
      setAccessToken(null)
    }
  }, [authenticated, auth])

  return authenticated
};
