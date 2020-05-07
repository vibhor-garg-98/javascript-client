import React from 'react';
import PropTypes from 'prop-types';
import Input, { P } from './style';

const TextField = (props) => {
  const {
    onChange, value, error, onBlur,
  } = props;
  return (
    <>
      <Input type="text" onChange={onChange} value={value} onBlur={onBlur} />
      <P>
        {error}
      </P>
    </>
  );
};

TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  // onClick: PropTypes.fun.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
