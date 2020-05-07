import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar/Navbar';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <br />
      {children}
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
