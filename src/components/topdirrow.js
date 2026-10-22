import React from 'react';
import Button from './button.js';

class TopDirectionRow extends React.Component {
  render() {
    return (
      <div className='ctrl-row'>
        <div className='ctrl-cell'></div>
        <div className='ctrl-cell'>
          <Button buttonId='upbutton' iconName='chevron-up' />
        </div>
        <div className='ctrl-cell'></div>
      </div>
    );
  }
}

export default TopDirectionRow
