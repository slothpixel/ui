import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Facebook } from 'react-content-loader';
import constants from '../../constants';
import GuildStats from './GuildStats';
import RenderString from '../../RenderUsername/RenderString';

const Styled = styled.div`
.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
}
.playerName {
  color: rgba(245, 245, 245, 0.870588);
  font-size: 32px;
  text-align: center;
}
.titleNameButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}
.imageContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.overviewAvatar {
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.4);
  @media only screen and (max-width: 768px) {
    margin-left: 0 !important;
  }
}
.icon {
  fill: ${constants.colorMutedLight} !important;
}
.topContainer {
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}
.topButtons {
  margin-left: auto;
}
.playerInfo {
  width: 100%;
  display: flex;
  padding-left: 15px;
  flex-direction: column;
  justify-content: center;
}
.registered {
  width: 18px;
  height: 18px;
  position: relative;
  &[data-hint-position="top"] {
    &::before {
      top: -7px;
      margin-left: 3px;
    }
    &::after {
      margin-bottom: 7px;
      margin-left: -7px;
    }
  }
}
.rankTierContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.guildTierMedal {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  width: 32px;
  margin: 0 5px;
}
`;

const getGuildTierMedal = (level, rank) => {
  let tier;
  if (level >= 95) {
    tier = 4;
  } else if (level >= 75) {
    tier = 3;
  } else if (level >= 55) {
    tier = 2;
  } else if (level >= 35) {
    tier = 1;
  } else if (level >= 15) {
    tier = 0;
  } else {
    return null;
  }

  let type;
  if (rank <= 10) {
    type = 'Gold';
  } else if (rank <= 25) {
    type = 'Silver';
  } else {
    type = 'Bronze';
  }

  const medalPath = `/assets/hypixel/guild/Level_${type}.png`;
  return (
    <div
      className="guildTierMedal"
      style={{ background: `url("${medalPath}") no-repeat`, backgroundPosition: `-${tier * 32}px 0` }}
    />
  );
};

const GuildHeader = ({
  guild, loading, error,
}) => {
  if (error) {
    // return <Error />;
  }
  if (loading) {
    return <Facebook primaryColor="#666" secondaryColor="#ecebeb" width={400} height={60} animate />;
  }
  return (
    <Styled>
      <div className="mainContainer">
        <div className="topContainer">
          <div className="playerInfo">
            <div className="titleNameButtons">
              { // TODO - Replace legacy ranking with current ranking
                getGuildTierMedal(guild.level, guild.legacy_ranking)}
              <div className="playerName">
                {
                  guild.tag !== null
                    ? RenderString(`&f${guild.name} ${guild.tag_color}[${guild.tag}]`)
                    : guild.name
                }
              </div>
            </div>
            <GuildStats {...guild} />
          </div>
        </div>
      </div>
    </Styled>
  );
};

GuildHeader.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  small: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.guild.loading,
  error: state.app.guild.error,
  guild: state.app.guild.data,
  small: state.browser.greaterThan.small,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(GuildHeader);
