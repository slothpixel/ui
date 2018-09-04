import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Home';
import Footer from '../Footer';

class App extends React.Component {

  render() {
    const {
      params, width, location, strings,
    } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
        <Footer location={location} width={width}/>
      </div>
    )
  }
}

export default App;