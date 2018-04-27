import React from 'react';
import Button from './button.js';

class BottomDirectionRow extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-sm-4'> </div>
        <div className='col-sm-4'>
          <Button buttonId='downbutton' iconName='chevron-down' />
        </div>
        <div className='col-sm-4'> </div>
      </div>
    );
  }
}

export default BottomDirectionRow
