import React from 'react';
import Footer from '../components/Footer/Footer';

const AuthLayout = (props) => {
  const { children } = props
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default AuthLayout;
