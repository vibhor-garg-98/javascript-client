import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { P } from './style';

const RadioGroup = (props) => {
  const {
    options, onChange, error, onBlur,
  } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="cricketGroup" value={value} onChange={onChange} onBlur={onBlur} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <P>
        {error}
      </P>
    </>

  );
};


RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};

export default RadioGroup;
