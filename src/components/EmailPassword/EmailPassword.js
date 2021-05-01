/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';

const mapState = ({ user }) => ({
  userErrors: user.userErrors,
  resetPasswordSuccess: user.resetPasswordSuccess,
});
const EmailPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userErrors, resetPasswordSuccess } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const authWrapperConfig = {
    heading: 'Email Password',
  };

  const handleChange = e => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/login');
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (userErrors.length > 0) {
      setErrors(userErrors);
    }
  }, [userErrors]);
  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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

export default EmailPassword;
