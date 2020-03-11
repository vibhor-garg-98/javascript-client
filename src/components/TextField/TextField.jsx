import React from 'react';
import PropTypes from 'prop-types';
import Input from './style';

const TextField = (props) => {
  const {
    onChange, value, error,
  } = props;
  return (
    <>
      <Input type="text" onChange={onChange} value={value} />

      {error}
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  // onClick: PropTypes.fun.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
