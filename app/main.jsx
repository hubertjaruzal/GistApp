import 'jquery/dist/jquery';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';
import 'material-design-icons/iconfont/material-icons.css';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './config/AppRouter';
import AppStore from './store/AppStore';

require('./styles/app.scss');

ReactDOM.render(
  <AppRouter appStore={new AppStore()} />,
  document.body.appendChild(document.createElement('div'))
);
