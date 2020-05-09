import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeRoute = (props) => {
  const { match: { path } } = props;
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:TraineeId`} component={TraineeDetail} />
      </Switch>
    </Router>
  );
};

export default TraineeRoute;
