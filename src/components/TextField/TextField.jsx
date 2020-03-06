import React from 'react';
import Input from './style';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const { onChange, value } = props
  return <Input type="text" onChange={onChange} value={value} />
}

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
