import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout/PrivateLayout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )} />
  )
};

export default PrivateRoute;
