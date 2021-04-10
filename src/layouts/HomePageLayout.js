import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const HomePageLayout = props => {
  const { children } = props;
  return (
    <div className="full-height">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
HomePageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default HomePageLayout;
