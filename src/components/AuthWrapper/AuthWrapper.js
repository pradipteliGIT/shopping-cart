/* eslint-disable react/prop-types */
import React from 'react';
import './AuthWrapper.scss';

const AuthWrapper = ({ heading, children }) => (
  <div className="auth-wrapper">
    <div className="wrap">
      {heading && <h1>{heading}</h1>}
      {children && children}
    </div>
  </div>
);

export default AuthWrapper;
