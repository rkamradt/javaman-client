import React from 'react';
import Button from './button.js';

class MiddleDirectionRow extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-4'>
          <Button buttonId='leftbutton' iconName='chevron-left' />
        </div>
        <div className='col-sm-4'> </div>
        <div className='col-sm-4'>
          <Button buttonId='rightbutton' iconName='chevron-right' />
        </div>
      </div>
    );
  }
}

export default MiddleDirectionRow
