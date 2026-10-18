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

class Button extends React.Component {
  render() {
    return (
      <button id={this.props.buttonId} type='button' className='btn btn-secondary'>
        {LABELS[this.props.iconName] ?? this.props.iconName}
      </button>
    );
  }
}

export default Button
