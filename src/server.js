/*
 * Copyright 2015 randalkamradt.
 */

const API_BASE = import.meta.env.VITE_API_URL  // e.g. https://api.kamradtfamily.net/javaman

// Transform new API response {world, player, players} into the shape field.js expects:
// { world, uid, users: { [user_id]: { cursorx, cursory, uid } } }
function transformState(data, userId) {
  const users = {}
  for (const p of data.players) {
    users[p.user_id] = { cursorx: p.cursor_x, cursory: p.cursor_y, uid: p.user_id }
  }
  return { world: data.world, uid: userId, users }
}

export default class Server {
  constructor(controller, accessToken, userId) {
    this.controller = controller
    this.accessToken = accessToken
    this.userId = userId
  }

  _headers() {
    return {
      'content-type': 'application/json',
      'authorization': `Bearer ${this.accessToken}`,
    }
  }

  createWorld() {
    fetch(`${API_BASE}/v1/game/join`, {
      method: 'POST',
      headers: this._headers(),
    })
      .then(r => r.json())
      .then(data => this.controller.beginSuccess(transformState(data, this.userId)))
      .catch(err => this.controller.error('error joining game: ' + err, 'could not contact server'))
  }

  sync(command) {
    if (command) {
      fetch(`${API_BASE}/v1/game/move`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ direction: command.toUpperCase() }),
      })
        .then(r => r.json())
        .then(data => this.controller.syncSuccess(transformState(data, this.userId)))
        .catch(err => this.controller.error('error moving: ' + err, 'could not contact server'))
    } else {
      fetch(`${API_BASE}/v1/game/state`, {
        method: 'GET',
        headers: this._headers(),
      })
        .then(r => r.json())
        .then(data => this.controller.syncSuccess(transformState(data, this.userId)))
        .catch(err => this.controller.error('error getting state: ' + err, 'could not contact server'))
    }
  }

  reset() {
    fetch(`${API_BASE}/v1/game/reset`, {
      method: 'POST',
      headers: this._headers(),
    })
      .then(r => r.json())
      .then(data => this.controller.resetSuccess(transformState(data, this.userId)))
      .catch(err => this.controller.error('error resetting: ' + err, 'could not contact server'))
  }

  logoff() {
    fetch(`${API_BASE}/v1/game/logoff`, {
      method: 'POST',
      headers: this._headers(),
    })
      .then(r => r.json())
      .then(data => this.controller.stopSuccess(data))
      .catch(err => this.controller.error('error logging off: ' + err, 'could not contact server'))
  }
}
