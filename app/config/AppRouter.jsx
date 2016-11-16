import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import React from 'react';
import App from '../components/App';

const AppRouter = () => (
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);

export default AppRouter;
