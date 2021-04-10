import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <div className="wrap">
      <div className="logo">
        <Link to="/">
          <h2>LOGO</h2>
        </Link>
      </div>
      <div className="header-links">
        <ul>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);
export default Header;
