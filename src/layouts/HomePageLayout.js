import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const HomePageLayout = props => {
  const { children, currentUser } = props;
  return (
    <div className="full-height">
      <Header currentUser={currentUser} />
      {children}
      <Footer />
    </div>
  );
};
HomePageLayout.propTypes = {
  children: PropTypes.element.isRequired,
  currentUser: PropTypes.object,
};

HomePageLayout.defaultProps = {
  currentUser: null,
};
export default HomePageLayout;
