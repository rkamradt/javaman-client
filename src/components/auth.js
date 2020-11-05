import { useState, useEffect } from 'react';
import { fetchUser } from './user.js'

export const useAuth = (auth) => {
  const [authenticated, setAuthenticated] = useState(null)
  const [user, setUser] = useState(null)

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
        .then(fetchUser)
        .then(setUser)
    } else {
      setUser(null);
    }
  }, [authenticated, auth])

  return [authenticated, user];
};
