import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainPageLayout = props => {
  const { children, currentUser } = props;
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};
MainPageLayout.propTypes = {
  children: PropTypes.element.isRequired,
  currentUser: PropTypes.object,
};

MainPageLayout.defaultProps = {
  currentUser: null,
};

export default MainPageLayout;
