import React from 'react'
import TopDirectionRow from './topdirrow'
import MiddleDirectionRow from './middirrow'
import BottomDirectionRow from './botdirrow'
import ActionRow from './actionrow'
import Header from './header'
import { useKeycloak } from '../KeycloakContext'
import { useAuth } from './auth'
import { theController } from '../controller'

const Screen = () => {
  const { keycloak, initialized } = useKeycloak()
  useAuth()

  return (
    <div>
      <header>
        {initialized && (
          <div>
            <button
              onClick={() => keycloak.authenticated
                ? (theController.logoff(), keycloak.logout({ redirectUri: window.location.origin }))
                : keycloak.login()}
              className="App-link"
            >
              Log {keycloak.authenticated ? 'out' : 'in'}
            </button>
            <div className='container'>
              <Header />
              <canvas id='canvas' width='240' height='240' />
              <img id='squares' hidden={true} src='img/squares.png' alt=''/>
            </div>
            <div className='container'>
              <TopDirectionRow />
              <MiddleDirectionRow />
              <BottomDirectionRow />
              <ActionRow />
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Screen
