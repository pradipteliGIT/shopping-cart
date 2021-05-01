import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart } from '../../redux/User/user.actions';
import './Header.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
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
                <span onClick={signOut}>Logout</span>
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
