import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate, render } from 'react-dom';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import store from './store';
import { getMetadata, getStrings } from './actions';
import App from './components/App';
import { unregister } from './registerServiceWorker';

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
// Fetch strings
store.dispatch(getStrings());

ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);
const history = createHistory();
history.listen((location) => {
  ReactGA.pageview(location.pathname);
});

const rootElement = document.getElementById('root');
const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>
);
if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}

// registerServiceWorker();
unregister();
