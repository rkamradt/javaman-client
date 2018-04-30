import React from 'react';

class Logon extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.onLogonSubmit(data);
  }
  render() {
    return (
      <form id='logon' className='form-signin' onSubmit={this.handleSubmit}>
        <h2 className='form-signin-heading'>Please sign in</h2>
        <label htmlFor='inputEmail' className='sr-only'>Email address</label>
        <input type='email' id='inputEmail' name='email'  className='form-control' placeholder='Email address' required='true' autoFocus='true' />
        <label htmlFor='inputPassword' className='sr-only'>Password</label>
        <input type='password' id='inputPassword' name='password' className='form-control' required='true' />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign in</button>
      </form>
    );
  }
}

export default Logon
