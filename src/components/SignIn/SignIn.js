/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signInWithGoogle, auth } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';
import './SignIn.scss';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };
  const handleSubmit = async e => {
    e.preventDefault();
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      reset();
      props.history.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const authWrapperConfig = { heading: 'SignIn' };
  return (
    <AuthWrapper {...authWrapperConfig}>
      <form onSubmit={handleLogin}>
        <FormInput
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormInput
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button>Login</Button>
      </form>
      <form onSubmit={handleSubmit}>
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
};
export default withRouter(SignIn);
