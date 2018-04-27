import React from 'react';
import TopDirectionRow from './topdirrow';
import MiddleDirectionRow from './middirrow';
import BottomDirectionRow from './botdirrow';
import ActionRow from './actionrow';
import Header from './header';
import Logon from './logon';

class Screen extends React.Component {
  render() {
    return(
      <div>
        <div className='container'>
          <Header />
          <Logon onLogonSubmit={this.props.handleLogonSubmit} />
          <canvas id='canvas' width='240' height='240' />
          <img id='squares' hidden='true' src='img/squares.png' alt=''/>
        </div>
        <div className='container'>
          <TopDirectionRow />
          <MiddleDirectionRow />
          <BottomDirectionRow />
          <ActionRow />
        </div>
      </div>
    );
  }
}

export default Screen
