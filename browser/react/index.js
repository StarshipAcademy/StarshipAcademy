import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { AppContainer } from './containers';
import 'aframe';

import SOCKET from '../sockets';

// Hack for mobile support for materialize-ui
injectTapEventPlugin();

/*
  Provider = react-redux supplying context of store.
  Mui = materialize-ui providing a default theme for itself.
  Router = react-router
*/
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={AppContainer} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
