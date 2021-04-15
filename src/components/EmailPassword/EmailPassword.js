import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';

const EmailPassword = props => {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const authWrapperConfig = {
    heading: 'Email Password',
  };
  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      url: 'http://localhost:3001/login',
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        // eslint-disable-next-line react/prop-types
        history.push('/login');
      })
      .catch(() => {
        const err = ['Email not found. Please try again'];
        setErrors(err);
      });
  };
  return (
    <AuthWrapper {...authWrapperConfig}>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <FormInput id="email" name="email" type="email" value={email} placeholder="Email" onChange={handleChange} />
        <Button>Email Password</Button>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
