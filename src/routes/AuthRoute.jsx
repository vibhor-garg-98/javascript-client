import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )} />
  )
};

export default AuthRoute
