/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Error from '../../Error';
import Spinner from '../../Spinner';
import addCommas from '../../../utility';
import { PlayerStatsCard } from './Styled';
import constants from '../../constants';

const Styled = styled.div`
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
}
.colorGold {
  color: ${constants.colorGold}
}
.colorDarkAqua {
  color: ${constants.colorDarkAqua}
}
.colorGreen {
  color: ${constants.colorGreen}
}
.colorDarkGreen {
  color: ${constants.colorDarkGreen}
}
.colorRed {
  color: ${constants.colorRed}
}
.colorLightPurple {
  color: ${constants.colorLightPurple}
}
.colorWhite {
  color: ${constants.colorWhite}
}
.icon {
  fill: ${constants.colorMutedLight} !important;
}
hr {
  display: block;
  -webkit-margin-before: .5em;
  -webkit-margin-after: .5em;
  -webkit-margin-start: auto;
  -webkit-margin-end: auto;
  border: 5px 0;
  opacity: .1;
}
.estimateHelp {
  display: inline-block;
  position: relative;
  & svg {
    width: 16px !important;
    height: 16px !important;
    margin-left: 5px;
    position: absolute;
    margin-top: -13px;
  }
  &[data-hint-position="top"] {
    &::after {
      margin-bottom: 19px;
      margin-left: -2px;
    }
    &::before {
      top: -19px;
      margin-left: 7px;
    }
  }
}
`;

export const PlayerStatsCards = ({
  loading,
  error,
  compact,
  username,
  level,
  achievement_points,
  karma,
  quests = 0,
  online,
  first_login,
  last_login,
  guild,
  strings,
}) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <Styled>
      <div className="container">
        <div style={{ textAlign: compact ? 'center' : '' }}>
          <PlayerStatsCard
            subtitle={<div className="colorGold">{Math.floor(level)}</div>}
            title={strings.th_level}
          />
          <PlayerStatsCard
            subtitle={<div className="colorGold">{addCommas(achievement_points)}</div>}
            title={strings.th_achievements}
          />
          <PlayerStatsCard
            subtitle={<div className="colorDarkAqua">{addCommas(quests)}</div>}
            title={strings.th_quests}
          />
          <PlayerStatsCard
            subtitle={<div className="colorDarkGreen">{addCommas(quests)}</div>}
            title={strings.th_wins_total}
          />
          <PlayerStatsCard
            subtitle={<div className="colorRed">{addCommas(quests)}</div>}
            title={strings.th_kills_total}
          />
          <PlayerStatsCard
            subtitle={<div className="colorLightPurple">{addCommas(karma)}</div>}
            title={strings.th_karma}
          />
          <hr />
          <PlayerStatsCard
            subtitle={<div className="colorWhite">{0}</div>}
            title={strings.th_friends}
          />
          <PlayerStatsCard
            subtitle={guild.name
              ? <a href={`/guilds/player/${username}`}>{guild.name}</a>
              : <div className="colorWhite">{strings.th_none}</div>}
            title={strings.th_guild}
          />
          <PlayerStatsCard
            subtitle={<div className={online ? 'colorGreen' : 'colorRed'}>{online ? strings.th_session_online : strings.th_session_offline}</div>}
            title={strings.th_session}
          />
          <PlayerStatsCard
            subtitle={<div className="colorWhite">{first_login}</div>}
            title={strings.th_first_login}
          />
          <PlayerStatsCard
            subtitle={<div className="colorWhite">{last_login}</div>}
            title={strings.th_last_login}
          />
        </div>
      </div>
    </Styled>
  );
};

const {
  number, bool, shape, string,
} = PropTypes;

PlayerStatsCards.propTypes = {
  loading: bool,
  error: bool,
  compact: bool,
  username: string,
  level: number,
  achievement_points: number,
  karma: number,
  quests: number,
  online: bool,
  first_login: number,
  last_login: number,
  guild: shape({}),
  strings: shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerStatsCards);
