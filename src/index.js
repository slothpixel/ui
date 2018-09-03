import React from 'react';
import createHistory from 'history/createBrowserHistory';
import {hydrate, render} from 'react-dom';
import {Route, Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReactGA from 'react-ga';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);
const history = createHistory();
history.listen((location) => {
  ReactGA.pageview(location.pathname);
});

const rootElement = document.getElementById('root');
const app = (
  <Provider store="">
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </Provider>);
if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}

registerServiceWorker();
