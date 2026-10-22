import React from 'react';
import Button from './button.js';

class BottomDirectionRow extends React.Component {
  render() {
    return (
      <div className='ctrl-row'>
        <div className='ctrl-cell'></div>
        <div className='ctrl-cell'>
          <Button buttonId='downbutton' iconName='chevron-down' />
        </div>
        <div className='ctrl-cell'></div>
      </div>
    );
  }
}

export default BottomDirectionRow
