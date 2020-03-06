import React from 'react';
import Select from './style';
import PropTypes from 'prop-types'

const SelectField = (props) => {
  // console.log('inside select field', props);
  const { options, defaultOption, onChange, value, error } = props;
  return (
    <>
      <Select value={value} onChange={onChange}>
        {defaultOption && <option>{defaultOption}</option>}
        {
          options && options.length && options.map(({ value, label }) => {
            return (
              <option key={label} value={value} onChange={onChange}>{label}</option>
            );
          })
        }
      </Select>
      <p>
        {error}
      </p>
    </>
  )
}

SelectField.propTypes = {
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  error: '',
}

export default SelectField;
