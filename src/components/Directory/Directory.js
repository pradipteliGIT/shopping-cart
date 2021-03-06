/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Directory.scss';
import ShopMens from '../../assets/ShopMens.jpg';
import ShopWomens from '../../assets/ShopWomens.jpg';

const Directory = () => (
  <div className="directory">
    <div className="wrap">
      <div className="item" style={{ backgroundImage: `url(${ShopWomens})` }}>
        <a>Shop WoMens</a>
      </div>
      <div className="item" style={{ backgroundImage: `url(${ShopMens})` }}>
        <a>Shop Mens</a>
      </div>
    </div>
  </div>
);
export default Directory;
