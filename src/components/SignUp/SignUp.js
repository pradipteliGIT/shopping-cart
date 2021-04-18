/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import './SignUp.scss';
import { EMAIL_REGX } from '../../constants/constants';
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const SignUp = props => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // const reset = () => {
  //   setDisplayName('');
  //   setEmail('');
  //   setPassword('');
  //   setConfirmPassword('');
  //   setErrors([]);
  // };

  const handleSubmit = async event => {
    event.preventDefault();
    const errorMessages = [];
    if (displayName.trim().length === 0) {
      errorMessages.push('Name required');
    }
    if (email.trim().length === 0) {
      errorMessages.push('Email required');
    }
    if (!EMAIL_REGX.test(email)) {
      errorMessages.push('Invalid Email');
    }
    if (password !== confirmPassword) {
      errorMessages.push('Password and confirm password not matching');
    }

    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      return;
    }
    try {
      // Create user
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // Add user details using utility function
      await handleUserProfile(user, { displayName });
      // reset();
      props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const authWrapperConfig = { heading: 'Registration' };
  return (
    <AuthWrapper {...authWrapperConfig}>
      {errors.length > 0 && (
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
export default withRouter(SignUp);
