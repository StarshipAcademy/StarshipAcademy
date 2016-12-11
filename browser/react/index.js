import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from '../redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { AppContainer } from './containers';

import { fetchWelcomeText } from '../redux/action-creators';

const fetchText = () => {
  store.dispatch(fetchWelcomeText());
};

import SOCKET from '../sockets';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={AppContainer} onEnter={fetchText} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
