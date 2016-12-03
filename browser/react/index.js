import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { AppContainer } from './containers';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={AppContainer} />
  </Router>,
  document.getElementById('react-app')
);
