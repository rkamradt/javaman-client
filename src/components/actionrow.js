import React from 'react';
import Button from './button.js';

class ActionRow extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-4'>
          <Button buttonId='resetbutton' iconName='refresh' />
        </div>
        <div className='col-sm-4'>
          <Button buttonId='stopbutton' iconName='stop' />
        </div>
        <div className='col-sm-4'>
          <Button buttonId='startbutton' iconName='play' />
        </div>
      </div>
    );
  }
}

export default ActionRow
