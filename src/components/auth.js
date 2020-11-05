import { useState, useEffect } from 'react';
import { fetchUser } from './user.js'

export const useAuth = (auth) => {
  const [authenticated, setAuthenticated] = useState(null)
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    auth.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    })
  })

  useEffect(() => {
    if (authenticated) {
      setUser(null)
      auth.getAccessToken()
        .then(setAccessToken)
        .then(fetchUser)
        .then(setUser)
    } else {
      setUser(null);
      setAccessToken(null)
    }
  }, [authenticated, auth])

  return [authenticated, user, accessToken];
};
