import React from 'react';

class Logon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      return;
    }
    this.props.onLogonSubmit({email: email, password: password});
  }
  render() {
    return (
      <form id='logon' className='form-signin' onSubmit={this.handleSubmit}>
        <h2 className='form-signin-heading'>Please sign in</h2>
        <label htmlFor='inputEmail' className='sr-only'>Email address</label>
        <input type='email' id='inputEmail' name='email' value={this.state.username}
          onChange={this.handleInputChange} className='form-control' placeholder='Email address' required='true' autoFocus='true' />
        <label htmlFor='inputPassword' className='sr-only'>Password</label>
        <input type='password' id='inputPassword' name='password' value={this.state.password}
          onChange={this.handleInputChange} className='form-control' required='true' />
        <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign in</button>
      </form>
    );
  }
}

export default Logon
