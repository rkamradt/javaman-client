import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className='game-header'>
        <span className='game-header-icon'>🎃</span>
        <span className='game-header-label'>java man // <span>halloween</span></span>
      </div>
    );
  }
}

export default Header
