import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  transition: ${constants.normalTransition};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${props => (props.open ? '256px' : '0px')};
  background-image: ${props => (props.location.pathname === '/' ? 'url("/assets/home-background.png")' : '')};
  background-position: ${props => (props.location.pathname === '/' ? 'center top' : '')};
  background-repeat: ${props => (props.location.pathname === '/' ? 'no-repeat' : '')};
`;

const StyledBodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;
  @media only screen and (min-width: ${constants.appWidth}px) {
    width: ${constants.appWidth}px;
    margin: auto;
  }
`;

class App extends React.Component {
  static propTypes = {
    params: PropTypes.shape({}),
    width: PropTypes.number,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  };

  render() {
    const {
      params, width, location, strings,
    } = this.props;
    return (
      <StyledDiv {...this.props}>
        <StyledBodyDiv {...this.props}>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </StyledBodyDiv>
        <Footer location={location} width={width}/>
      </StyledDiv>
    )
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(App);