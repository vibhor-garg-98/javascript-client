import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import ls from 'local-storage';
import { ApolloProvider } from '@apollo/react-components';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import Trainee from './pages/Trainee/Trainee';
// import Login from './pages/Login/Login';
import TextFieldDemo from './pages/TextFieldDemo/TextFieldDemo';
import InputDemo from './pages/InputDemo/InputDemo';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute';
import NoMatch from './pages/NoMatch/NoMatch';
import SnackBarProvider from './contexts';
import apolloClient from './lib/apollo-client';
import Wrapper from './pages/Login/Wrapper';

function App() {
  return (
    <div>
      <SnackBarProvider>
        <ApolloProvider client={apolloClient}>
          {ls.get('token') ? (
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/Trainee" />
                </Route>
                <AuthRoute path="/Login" component={Wrapper} />
                <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
                <PrivateRoute path="/Trainee" component={Trainee} />
                <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
                <PrivateRoute path="/InputDemo" component={InputDemo} />
                <PrivateRoute component={NoMatch} />

              </Switch>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/Login" />
                </Route>
                <AuthRoute path="/Login" component={Wrapper} />
                <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
                <PrivateRoute path="/Trainee" component={Trainee} />
                <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
                <PrivateRoute path="/InputDemo" component={InputDemo} />
                <PrivateRoute component={NoMatch} />

              </Switch>
            </Router>
          )}
        </ApolloProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
