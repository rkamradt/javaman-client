import React from 'react';
import Button from './button.js';

class MiddleDirectionRow extends React.Component {
  render() {
    return (
      <div className='ctrl-row'>
        <div className='ctrl-cell'>
          <Button buttonId='leftbutton' iconName='chevron-left' />
        </div>
        <div className='ctrl-cell'></div>
        <div className='ctrl-cell'>
          <Button buttonId='rightbutton' iconName='chevron-right' />
        </div>
      </div>
    );
  }
}

export default MiddleDirectionRow
