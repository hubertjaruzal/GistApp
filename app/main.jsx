import 'jquery/dist/jquery';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './config/AppRouter';
import AppStore from './store/AppStore';

ReactDOM.render(
  <AppRouter todoStore={new AppStore()} />,
  document.body.appendChild(document.createElement('div'))
);
