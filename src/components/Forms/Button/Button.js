import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = props => {
  const { onClick, children, type } = props;
  return (
    <button type={type} className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  type: PropTypes.string,
};
Button.defaultProps = {
  type: 'submit',
};
export default Button;
