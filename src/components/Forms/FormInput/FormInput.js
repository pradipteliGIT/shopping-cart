import PropTypes from 'prop-types';
import React from 'react';
import './FormInput.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="form-row">
    {label && <label>{label}</label>}
    <input onChange={handleChange} {...otherProps} />
  </div>
);

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
};
export default FormInput;
