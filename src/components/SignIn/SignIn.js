/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';
import './SignIn.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
  };

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }
  }, [currentUser]);

  const handleLogin = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
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
            <Button onClick={handleGoogleSignIn}>Sign in with google</Button>
          </div>
        </div>
      </form>
      <div className="links">
        <Link to="/recovery">Reset Password</Link>
      </div>
    </AuthWrapper>
  );
};
export default SignIn;
