import React from 'react';
import Button from './button.js';

class ActionRow extends React.Component {
  render() {
    return (
      <div className='ctrl-row'>
        <div className='ctrl-cell'>
          <Button buttonId='resetbutton' iconName='refresh' />
        </div>
        <div className='ctrl-cell'>
          <Button buttonId='stopbutton' iconName='stop' />
        </div>
        <div className='ctrl-cell'>
          <Button buttonId='startbutton' iconName='play' />
        </div>
      </div>
    );
  }
}

export default ActionRow
