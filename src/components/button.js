import React from 'react'

const LABELS = {
  'chevron-up':    '▲',
  'chevron-down':  '▼',
  'chevron-left':  '◀',
  'chevron-right': '▶',
  'refresh':       '↺',
  'stop':          '■',
  'play':          '▶',
}

const ACTION_IDS = ['resetbutton', 'stopbutton', 'startbutton']

const Button = ({ buttonId, iconName, onPointerDown, onPointerUp, onPointerLeave }) => (
  <button
    id={buttonId}
    type="button"
    className={ACTION_IDS.includes(buttonId) ? 'btn-action' : 'btn-ctrl'}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerLeave}
  >
    {LABELS[iconName] ?? iconName}
  </button>
)

export default Button
