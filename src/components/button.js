import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button id={this.props.buttonId} type='button' className='btn btn-default'>
        <span className={"glyphicon glyphicon-" + this.props.iconName} />
      </button>
    );
  }
}

export default Button
