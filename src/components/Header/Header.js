import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import { auth } from '../../firebase/utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const Header = () => {
  const { currentUser } = useSelector(mapState);
  return (
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
                <Link to="/dashboard">Dashboard</Link>
              </li>
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
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
