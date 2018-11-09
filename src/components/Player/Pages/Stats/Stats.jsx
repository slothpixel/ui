import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import styled from 'styled-components';
// import constants from '../../../constants';
// import { getPlayer } from '../../../../actions';

const Stats = () => (
  <p>stats page</p>
);

/* const getData = (props) => {

}; */

class RequestLayer extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  componentDidMount() {
    // getData(this.props);
  }

  /* componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  } */

  render() {
    return <Stats {...this.props} />;
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

/* const mapDispatchToProps = dispatch => ({

}); */

export default connect(mapStateToProps)(RequestLayer);
