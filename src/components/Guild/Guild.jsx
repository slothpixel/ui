import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import {
  getGuild,
} from '../../actions';
import TabBar from '../TabBar';
import Spinner from '../Spinner';
import GuildHeader from './Header/GuildHeader';
import guildPages from './guildPages';

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
    props.getGuild(playerId);
  }

  render() {
    const {
      location, strings, match, loading, guild,
    } = this.props;
    const { playerId } = match.params;
    const info = match.params.info || 'members';
    const page = guildPages(playerId, strings).find(_page => _page.key === info);
    const title = guild.name;
    if (loading) return null;
    return (
      <div>
        <Helmet title={title} />
        <div>
          <GuildHeader location={location} />
          <TabBar info={info} tabs={guildPages(playerId, strings)} />
        </div>
        <div>
          {page ? page.content(playerId, match.params, location) : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.guild.loading,
  guild: state.app.guild.data,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getGuild: playerId => dispatch(getGuild(playerId, { populatePlayers: true })),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
