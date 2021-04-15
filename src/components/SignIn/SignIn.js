import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_DETAILS } from '../../constants/constants';
import { signInWithGoogle, auth } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';
import './SignIn.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...LOGIN_DETAILS };
  }

  handleSubmit = async e => {
    e.preventDefault();
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ ...LOGIN_DETAILS });
    } catch (err) {
      alert(err.message);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const authWrapperConfig = { heading: 'SignIn' };
    return (
      <AuthWrapper {...authWrapperConfig}>
        <form onSubmit={this.handleLogin}>
          <FormInput id="email" type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
          <FormInput
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <Button>Login</Button>
        </form>
        <form onSubmit={this.handleSubmit}>
          <div className="social-sign-in">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with google</Button>
            </div>
          </div>
        </form>
        <div className="links">
          <Link to="/recovery">Reset Password</Link>
        </div>
      </AuthWrapper>
    );
  }
}
export default SignIn;
