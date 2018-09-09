import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate, render } from 'react-dom';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import store from './store';
import { getStrings } from './actions';
import { injectGlobal } from 'styled-components';
import constants from './components/constants';
import App from './components/App';
import { unregister } from './registerServiceWorker';

// Inject global styles
injectGlobal([`
body {
  background-color: initial;
  text-align: initial;
  display: initial;
  justify-content: initial;
  align-items: initial;
  height: initial;
  width: initial;
  margin: 0;
  font-family: ${constants.fontFamily};
}
a {
  color: ${constants.primaryLinkColor};
  text-decoration: none;
  transition: ${constants.normalTransition};
  &:hover {
    color: color(${constants.primaryLinkColor} lightness(-33%));
  }
}
li {
  list-style-type: none;
}
#root {
  height: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #192023;
  background-image: -webkit-linear-gradient(315deg, #2e2d45, #1c2127);
  background-image: linear-gradient(135deg, #2e2d45, #1c2127);
  color: ${constants.primaryTextColor};
}
[data-tip] {
  cursor: help;
}
[data-id="tooltip"] {
  padding: 8px 12px !important;
  border-radius: 2px !important;
  background-color: ${constants.almostBlack} !important;
  color: ${constants.textColorPrimary} !important;
  white-space: pre-wrap;
  line-height: 1.5 !important;
  text-align: left;
  margin: -3px !important;
  &:matches(::after, ::before) {
    content: none !important;
  }
}
@keyframes tooltip-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
[data-hint] {
  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    opacity: 0;
    z-index: 10000;
    pointer-events: none;
  }
  &::before {
    content: "";
    width: 0;
    height: 0;
  }
  &::after {
    content: attr(data-hint);
    background-color: ${constants.almostBlack};
    color: ${constants.textColorPrimary};
    border-radius: 2px;
    padding: 5px 8px;
    font-weight: ${constants.fontWeightLight};
    text-transform: none;
    font-size: 13px;
    line-height: 1.3;
    white-space: nowrap;
  }
  &:hover {
    cursor: help;
    &::before,
    &::after {
      animation-name: tooltip-appear;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
      animation-delay: 0.4s;
    }
  }
}
[data-hint-position="top"] {
  &::after {
    bottom: 100%;
    margin-bottom: 3px;
    margin-left: -24px;
  }
  &::before {
    border-style: solid;
    border-width: 3px 6px 0 6px;
    border-color: ${constants.almostBlack} transparent transparent transparent;
    top: -3px;
  }
}
[data-hint-position="bottom"] {
  &::after {
    top: 100%;
    margin-top: 3px;
    margin-left: -24px;
  }
  &::before {
    border-style: solid;
    border-width: 0 6px 3px 6px;
    border-color: transparent transparent ${constants.almostBlack} transparent;
    bottom: -3px;
  }
}
`]);

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
      <Route component={App}/>
    </Router>
  </Provider>);
if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}

// registerServiceWorker();
unregister();