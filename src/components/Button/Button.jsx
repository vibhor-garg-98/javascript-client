import React from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './style';

const Button = (props) => {
  const {
    onClick, value, style, color, disabled,
  } = props;
  return (
    <>
      <Buttons
        type={value}
        style={style}
        color={color}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </Buttons>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  color: 'default' || 'primary',
  disabled: false,
  style: {},
};

export default Button;
