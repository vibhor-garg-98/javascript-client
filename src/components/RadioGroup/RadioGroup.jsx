import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  // console.log('inside radio group', props);
  const { options, onChange, error } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => {
          return (
            <Fragment key={label}>
              <input type="radio" name="cricketGroup" value={value} onChange={onChange} />{label}<br />
            </Fragment>
          );
        })
      }
      <p>
        {error}
      </p>
    </>

  );
}


RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};

export default RadioGroup;
