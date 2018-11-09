import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import {
  getPlayer,
  getGuild,
} from '../../actions';
import TabBar from '../TabBar';
import Spinner from '../Spinner';
import PlayerHeader from './Header/PlayerHeader';
import playerPages from './playerPages';

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
    loading: PropTypes.bool,
    strings: PropTypes.shape({}),
    player: PropTypes.shape({}),
    guild: PropTypes.shape({}),
  };

  componentDidMount() {
    const { props } = this;
    const { playerId } = props.match.params;
    props.getPlayer(playerId);
    props.getGuild(playerId);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { playerId } = props.match.params;
    if (prevProps.match.params.playerId !== playerId) {
      props.getPlayer(playerId);
    }
  }

  render() {
    const {
      location, match, strings, loading, player,
    } = this.props;
    const { playerId } = match.params;
    const info = match.params.info || 'stats';
    const page = playerPages(playerId, strings).find(_page => _page.key === info);
    const playerName = player.username || playerId || strings.general_anonymous;
    const title = playerName;
    if (loading) return null;
    return (
      <div>
        <Helmet title={title} />
        <div>
          <PlayerHeader location={location} />
          <TabBar info={info} tabs={playerPages(playerId, strings)} />
        </div>
        <div>
          {page ? page.content(playerId, match.params, location) : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  player: state.app.player.data,
  guild: state.app.guild.data,
  playerName: (state.app.player.data || {}).username,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: playerId => dispatch(getPlayer(playerId)),
  getGuild: playerId => dispatch(getGuild(playerId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
