import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Facebook } from 'react-content-loader';
import constants from '../../constants';
import PlayerStats from './PlayerStats';
import RenderUsername from '../../RenderUsername';

const Styled = styled.div`
.mainContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.5);
}
.playerName {
  color: rgba(245, 245, 245, 0.870588);
  font-size: 28px;
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
.rankMedal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 30px;
  -webkit-filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3))
  drop-shadow(2px -2px 2px rgba(0, 0, 0, 0.3));
  &[data-hint-position="top"] {
    &::after {
      margin-bottom: 3px;
      margin-left: 52px;
    }
    &::before {
      top: -3px;
      margin-left: 57px;
    }
  }
  & img {
    width: 124px;
    height: 124px;
  }
  &-icon {
  }
  &-board {
    position: absolute;
    align-self: center;
    margin-top: 40px;
    margin-left: 1px;
    font-size: 22px;
    color: #ECD9C8;
    text-shadow: 0 0 10px black;
  }
  &-star {
    position: absolute;
  }
}
`;


const PlayerHeader = ({
  player, guild, loading, error,
}) => {
  if (error) {
    // return <Error />;
  }
  if (loading) {
    return <Facebook primaryColor="#666" secondaryColor="#ecebeb" width={400} height={60} animate />;
  }
  /* let badgeStyle = {
    fontSize: 20,
    top: 5,
    left: 40,
    background: registered ? constants.colorGreen : 'transparent',
    width: 18,
    height: 18,
  };
  if (!small) {
    badgeStyle = {
      ...badgeStyle,
      marginLeft: -1 * (LARGE_IMAGE_SIZE / 2) * 0.75,
    };
  }
  */
  return (
    <Styled>
      <div className="mainContainer">
        <div className="topContainer">
          <div className="imageContainer">
            <img src={`https://crafatar.com/renders/head/${player.uuid || '00000000-0000-4000-0000-000000000000'}?helm&default=MHF_Steve&scale=6`} alt="" />
          </div>
          <div>
            {/* <Badge
              badgeContent={getRegistrationBadge(registered, strings)}
              badgeStyle={badgeStyle}
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <Avatar
                src={picture}
                style={avatarStyle}
                size={LARGE_IMAGE_SIZE}
                className="overviewAvatar"
              />
            </Badge> */}
          </div>
          <div className="playerInfo">
            <div className="titleNameButtons">
              <div className="playerName">
                <RenderUsername {...player} {...guild} />
              </div>
            </div>
            <PlayerStats {...player} guild={guild} />
          </div>
        </div>
      </div>
    </Styled>
  );
};

PlayerHeader.propTypes = {
  playerName: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  small: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.player.loading && state.app.guild.loading,
  error: state.app.player.error && state.app.guild.error,
  player: state.app.player.data,
  guild: state.app.guild.data,
  playerName: (state.app.player.data || {}).username,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  small: state.browser.greaterThan.small,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerHeader);
