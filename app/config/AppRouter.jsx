import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import { observer } from 'mobx-react';
import React from 'react';
import App from '../components/App';
import Auth from '../components/Auth';
const Config = require('Config');

const AppRouter = observer(props =>
  <Router history={browserHistory} store={props.appStore} >
    <Route path="/" component={App} store={props.appStore} Config={Config}>
      <Route path="/auth" component={Auth} store={props.appStore} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);

export default AppRouter;
