import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Screen from './components/screen'
import { KeycloakProvider } from './KeycloakContext'

ReactDOM.createRoot(document.getElementById('screen')).render(
  <KeycloakProvider>
    <Screen />
  </KeycloakProvider>
)
