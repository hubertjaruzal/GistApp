import 'jquery/dist/jquery';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'bootstrap-sass/assets/javascripts/bootstrap.min';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
);
