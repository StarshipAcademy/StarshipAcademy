import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Very standard.
export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);
