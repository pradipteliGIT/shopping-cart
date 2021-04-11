/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.scss';
import { auth } from '../../firebase/utils';

const Header = ({ currentUser }) => (
  <header className="header">
    <div className="wrap">
      <div className="logo">
        <Link to="/">
          <h2>LOGO</h2>
        </Link>
      </div>
      <div className="header-links">
        {!currentUser && (
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        {currentUser && (
          <ul>
            <li>
              <span
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  currentUser: PropTypes.object,
};

Header.defaultProps = {
  currentUser: null,
};
export default Header;
