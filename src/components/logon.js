import React from 'react';

class Logon extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!email) {
      return;
    }
    this.props.onLogonSubmit({email: email, password: password});
  }
  render() {
    return (
      <form id='logon' className='form-signin' onSubmit={this.handleSubmit}>
        <h2 className='form-signin-heading'>Please sign in</h2>
        <label htmlFor='inputEmail' className='sr-only'>Email address</label>
        <input type='email' id='inputEmail' ref='email' className='form-control' placeholder='Email address' required='true' autoFocus='true' />
        <label htmlFor='inputPassword' className='sr-only'>Password</label>
        <input type='password' id='inputPassword' ref='password' className='form-control' required='true' />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign in</button>
      </form>
    );
  }
}

export default Logon
