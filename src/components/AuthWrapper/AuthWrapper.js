import React from 'react';
import PropTypes, { element } from 'prop-types';
import './AuthWrapper.scss';

const AuthWrapper = ({ heading, children }) => (
  <div className="auth-wrapper">
    <div className="wrap">
      {heading && <h1>{heading}</h1>}
      {children && children}
    </div>
  </div>
);

AuthWrapper.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.arrayOf(element),
};

export default AuthWrapper;
