import React, { Component } from 'react';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import './SignUp.scss';
import { USER_DETAILS, EMAIL_REGX } from '../../constants/constants';
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...USER_DETAILS, errors: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState({ ...USER_DETAILS, errors: [] });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
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
      this.setState({ errors: errorMessages });
      return;
    }
    try {
      // Create user
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // Add user details using utility function
      await handleUserProfile(user, { displayName });
      this.resetState();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } = this.state;
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
        <form onSubmit={this.handleSubmit}>
          <FormInput
            id="displayName"
            name="displayName"
            type="text"
            value={displayName}
            placeholder="Full Name"
            handleChange={this.handleChange}
          />
          <FormInput id="email" name="email" type="email" value={email} placeholder="Email" handleChange={this.handleChange} />
          <FormInput
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            handleChange={this.handleChange}
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={this.handleChange}
          />
          <Button type="submit">Register</Button>
        </form>
      </AuthWrapper>
    );
  }
}
export default SignUp;
