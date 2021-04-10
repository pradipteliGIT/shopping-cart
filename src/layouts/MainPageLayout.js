import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainPageLayout = props => {
  const { children } = props;
  return (
    <div>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};
MainPageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default MainPageLayout;
