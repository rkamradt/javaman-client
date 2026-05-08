import React from 'react';
import TopDirectionRow from './topdirrow';
import MiddleDirectionRow from './middirrow';
import BottomDirectionRow from './botdirrow';
import ActionRow from './actionrow';
import Header from './header';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from './auth';
import { theController } from '../controller'

const Screen = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const authenticated = useAuth()
  return (
    <div>
      <header>
        {isAuthenticated !== undefined && (
          <div>
          <button
            onClick={() => isAuthenticated
              ? logout({ logoutParams: { returnTo: window.location.origin } }, theController.logoff())
              : loginWithRedirect()}
            className="App-link"
          >
            Log {isAuthenticated ? 'out' : 'in'}
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
  );
};

export default Screen;
