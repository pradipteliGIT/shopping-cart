/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import './SignUp.scss';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import { resetUserState, signUpUserStart } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErrors: user.userErrors,
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErrors } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({ displayName, email, password, confirmPassword }));
  };

  useEffect(() => {
    if (currentUser) {
      reset();
      dispatch(resetUserState());
      history.push('/');
    }
  }, [currentUser]);

  useEffect(() => {
    if (userErrors.length > 0) {
      setErrors(userErrors);
    }
  }, [userErrors]);

  const authWrapperConfig = { heading: 'Registration' };
  return (
    <AuthWrapper {...authWrapperConfig}>
      {Array.isArray(errors) && errors.length > 0 && (
        <ul>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <FormInput
          id="displayName"
          name="displayName"
          type="text"
          value={displayName}
          placeholder="Full Name"
          handleChange={e => setDisplayName(e.target.value)}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          handleChange={e => setEmail(e.target.value)}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          handleChange={e => setPassword(e.target.value)}
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          handleChange={e => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
    </AuthWrapper>
  );
};
export default SignUp;
