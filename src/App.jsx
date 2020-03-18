import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ChildrenDemo from '../src/pages/ChildrenDemo/ChildrenDemo';
import Trainee from '../src/pages/Trainee/Trainee';
import Login from './pages/Login/Login';
import TextFieldDemo from '../src/pages/TextFieldDemo/TextFieldDemo';
import InputDemo from './pages/InputDemo/InputDemo';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute';
import NoMatch from './pages/NoMatch/NoMatch';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Trainee" />
          </Route>
          <AuthRoute path="/Login" component={Login} />
          <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/Trainee" component={Trainee} />
          <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateRoute path="/InputDemo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
