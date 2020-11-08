import React from 'react';
import Button from './button.js';

class TopDirectionRow extends React.Component {
  render() {
    console.log("creating top row buttons")
    return (
      <div className='row'>
        <div className='col-sm-4'> </div>
        <div className='col-sm-4'>
          <Button buttonId='upbutton' iconName='chevron-up' />
        </div>
        <div className='col-sm-4'> </div>
      </div>
    );
  }
}

export default TopDirectionRow
