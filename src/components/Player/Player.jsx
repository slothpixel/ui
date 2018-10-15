import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import {
  getPlayer,
} from '../../actions';
import PlayerHeader from './Header/PlayerHeader';

class RequestLayer extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        playerId: PropTypes.string,
      }),
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    officialPlayerName: PropTypes.string,
    playerName: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  componentDidMount() {
    const { props } = this;
    const { playerId } = props.match.params;
    props.getPlayer(playerId);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { playerId } = props.match.params;
    if (prevProps.match.params.playerId !== playerId) {
      props.getPlayer(playerId);
    }
  }

  render() {
    const { location, match, strings } = this.props;
    const { playerId } = this.props.match.params;
    const info = match.params.info || 'overview';
    // const page = playerPages(playerId, strings).find(_page => _page.key === info);
    const playerName = this.props.officialPlayerName || this.props.playerName || strings.general_anonymous;
    const title = playerName;
    if (this.props.loading) return null;
    return (
      <div>
        <Helmet title={title} />
        <div>
          <PlayerHeader />
          <p>{JSON.stringify(this.props.player)}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  player: state.app.player.data,
  playerName: (state.app.player.data || {}).username,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
