import React from 'react';
import PropTypes from 'prop-types';
import Select, { P } from './style';

const SelectField = (props) => {
  // console.log('inside select field', props);
  const {
    options, defaultOption, onChange, value, error, onBlur
  } = props;
  return (
    <>
      <Select value={value} onChange={onChange} onBlur={onBlur}>
        {defaultOption && <option>{defaultOption}</option>}
        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }
      </Select>
      <P>
        {error}
      </P>
    </>
  );
};

SelectField.propTypes = {
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  error: '',
};

export default SelectField;
