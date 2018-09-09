import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import app from '../reducers';

/* eslint-disable no-underscore-dangle */
// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default createStore(
  app,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
  ),
);