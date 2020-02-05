/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Error from '../../Error';
import Spinner from '../../Spinner';
import { addCommas, getLocalizedDate } from '../../../utility';
import { GuildStatsCard } from './Styled';
import constants from '../../constants';

const Styled = styled.div`
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
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

export const GuildStatsCards = ({
  loading,
  error,
  compact,
  level,
  exp,
  members,
  created,
  description,
  legacy_ranking,
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
          <GuildStatsCard
            subtitle={<div className="colorGold">{Math.floor(level)}</div>}
            title={strings.th_level}
          />
          <GuildStatsCard
            subtitle={<div className="colorWhite">{`${members.length}/125`}</div>}
            title={strings.guild_members}
          />
          <GuildStatsCard
            subtitle={<div className="colorWhite">{addCommas(legacy_ranking) || '-'}</div>}
            title={strings.guild_legacy_rank}
          />
          <GuildStatsCard
            subtitle={<div className="colorDarkAqua">{addCommas(exp)}</div>}
            title={strings.th_exp}
          />
          <GuildStatsCard
            subtitle={<div className="colorWhite">{getLocalizedDate(created)}</div>}
            title={strings.guild_created}
          />
          <hr />
          <GuildStatsCard
            subtitle={<div className="colorWhite">{description}</div>}
            title={strings.guild_description}
          />
        </div>
      </div>
    </Styled>
  );
};

const {
  string, number, bool, shape, arrayOf,
} = PropTypes;

GuildStatsCards.propTypes = {
  loading: bool,
  error: bool,
  compact: bool,
  level: number,
  exp: number,
  members: arrayOf(shape({})),
  created: number,
  legacy_ranking: number,
  description: string,
  strings: shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.guild.loading,
  error: state.app.guild.error,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(GuildStatsCards);
