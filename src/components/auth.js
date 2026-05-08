import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useController } from './init.js'

export const useAuth = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null)

  const setAndReturnAccessToken = (accessToken) => {
    console.log('setting accessToken ' + accessToken)
    setAccessToken(accessToken)
    return accessToken
  }

  useEffect(() => {
    if (isAuthenticated) {
      setAccessToken(null)
      console.log('getting accessToken')
      getAccessTokenSilently()
        .then(setAndReturnAccessToken)
        .then(useController)
        .then(setAccessToken)
    } else {
      setAccessToken(null)
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return isAuthenticated
};
