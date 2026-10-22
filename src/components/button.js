import React from 'react';

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

class Button extends React.Component {
  render() {
    const isAction = ACTION_IDS.includes(this.props.buttonId)
    return (
      <button
        id={this.props.buttonId}
        type='button'
        className={isAction ? 'btn-action' : 'btn-ctrl'}
      >
        {LABELS[this.props.iconName] ?? this.props.iconName}
      </button>
    );
  }
}

export default Button
