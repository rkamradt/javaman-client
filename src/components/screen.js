import React, { useEffect, useRef } from 'react'
import TopDirectionRow from './topdirrow'
import MiddleDirectionRow from './middirrow'
import BottomDirectionRow from './botdirrow'
import ActionRow from './actionrow'
import Header from './header'
import { useKeycloak } from '../KeycloakContext'
import { useAuth } from './auth'
import { theController } from '../controller'

const ARROW_MAP = {
  ArrowLeft:  'left',
  ArrowRight: 'right',
  ArrowUp:    'up',
  ArrowDown:  'down',
}

const BUTTON_ID = {
  left:  'leftbutton',
  right: 'rightbutton',
  up:    'upbutton',
  down:  'downbutton',
}

const Screen = () => {
  const { keycloak, initialized } = useKeycloak()
  const canvasRef = useRef(null)
  const squaresRef = useRef(null)
  useAuth(canvasRef, squaresRef)

  useEffect(() => {
    const onKeyDown = (e) => {
      const cmd = ARROW_MAP[e.key]
      if (!cmd) return
      e.preventDefault()
      const btn = document.getElementById(BUTTON_ID[cmd])
      if (btn) btn.classList.add('active')
      if (theController) theController.actionStart(cmd)
    }
    const onKeyUp = (e) => {
      const cmd = ARROW_MAP[e.key]
      if (!cmd) return
      e.preventDefault()
      const btn = document.getElementById(BUTTON_ID[cmd])
      if (btn) btn.classList.remove('active')
      if (theController) theController.actionStop(cmd)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <div>
      {/* Halloween decorations */}
      <div className="bat" aria-hidden="true">🦇</div>
      <div className="bat" aria-hidden="true">🦇</div>
      <div className="bat" aria-hidden="true">🦇</div>
      <div className="pumpkin" aria-hidden="true">🎃</div>
      <div className="pumpkin" aria-hidden="true">🎃</div>
      <div className="pumpkin" aria-hidden="true">🎃</div>
      <div className="pumpkin" aria-hidden="true">🎃</div>
      <div className="pumpkin" aria-hidden="true">🎃</div>
      <svg className="web-corner tl" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#ff6b00" strokeWidth="0.8" fill="none">
          <line x1="0" y1="0" x2="120" y2="0" />
          <line x1="0" y1="0" x2="0" y2="120" />
          <line x1="0" y1="0" x2="60" y2="120" />
          <line x1="0" y1="0" x2="120" y2="60" />
          <path d="M 30 0 Q 15 15 0 30" />
          <path d="M 60 0 Q 30 30 0 60" />
          <path d="M 90 0 Q 45 45 0 90" />
          <path d="M 120 0 Q 60 60 0 120" />
        </g>
      </svg>
      <svg className="web-corner tr" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#ff6b00" strokeWidth="0.8" fill="none">
          <line x1="0" y1="0" x2="120" y2="0" />
          <line x1="0" y1="0" x2="0" y2="120" />
          <line x1="0" y1="0" x2="60" y2="120" />
          <line x1="0" y1="0" x2="120" y2="60" />
          <path d="M 30 0 Q 15 15 0 30" />
          <path d="M 60 0 Q 30 30 0 60" />
          <path d="M 90 0 Q 45 45 0 90" />
          <path d="M 120 0 Q 60 60 0 120" />
        </g>
      </svg>

      <div className="leaf" aria-hidden="true">🍂</div>
      <div className="leaf" aria-hidden="true">🍁</div>
      <div className="leaf" aria-hidden="true">🍂</div>
      <div className="leaf" aria-hidden="true">🍁</div>
      <div className="leaf" aria-hidden="true">🍂</div>
      <div className="leaf" aria-hidden="true">🍁</div>

      <div className="app-frame">
        <div className="app-nav">
          <span className="app-nav-title">rkamradt // <span>javaman</span></span>
          {initialized && keycloak.authenticated && (
            <button
              className="btn-auth"
              onClick={() => { theController.logoff(); keycloak.logout({ redirectUri: window.location.origin }) }}
            >
              log out
            </button>
          )}
          {initialized && !keycloak.authenticated && (
            <div id="google-signin-btn" />
          )}
        </div>

        {initialized && (
          <div className="game-card">
            <Header />
            <div className="game-canvas-wrap">
              <canvas ref={canvasRef} width='240' height='240' />
              <img ref={squaresRef} hidden={true} src='img/squares.png' alt=''/>
            </div>
            <div className="game-controls">
              <TopDirectionRow />
              <MiddleDirectionRow />
              <BottomDirectionRow />
              <hr className="ctrl-divider" />
              <ActionRow />
            </div>
          </div>
        )}

        <div className="app-footer">
          node: kubernetes.default.svc &nbsp;|&nbsp; 🎃 halloween edition
        </div>
      </div>
    </div>
  )
}

export default Screen
