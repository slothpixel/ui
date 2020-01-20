/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { achievements_extended as achievementData, game_types as gameTypes } from 'hypixelconstants';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import { addCommas } from '../../../../utility';
import { getPlayerAchievements } from '../../../../actions';
import { HeaderCard } from './Styled';
// import { PlayerStatsCard } from '../../Header/Styled';
import constants from '../../../constants';
import ProgressBar from './ProgressBar';
// import Container from '../../../Container';

const StyledPageContainer = styled.div`
  display: flex;
  align-items: right;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .colorGold {
    color: ${constants.colorGold}
  }
  .colorDarkAqua {
    color: ${constants.colorDarkAqua}
  }
`;

const StyledHeaderContainer = styled.div`
  background-color: rgba(0, 0, 0, .25);
  padding: 10px;
`;

const AchievementContainer = styled.div`
  width: 100%;
  margin: 0 0 10px 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, .25);
`;

function getName(name = '') {
  let result;
  switch (name) {
    case 'christmas2017':
      result = 'Christmas';
      break;
    case 'general':
      result = 'General';
      break;
    case 'halloween2017':
      result = 'Halloween';
      break;
    case 'easter':
      result = 'Easter';
      break;
    default: {
      const temp = gameTypes.find(game => game.standard_name === name);
      result = temp === undefined ? name : temp.clean_name;
    }
  }
  return result;
}

function getAchievementContainer(type, game, achievementName, value) {
  const achievement = achievementData[game][type][achievementName];
  let { name, description } = achievement;
  let percent = 1;
  let progression = 'Completed!';
  if (type === 'tiered') {
    let goal = 0;
    let score = value;
    let tier = 1;
    for (let i = 0; i < 5; i += 1) {
      goal = achievement.tiers[i].amount;
      if (goal > score) {
        break;
      }
      tier += 1;
      score -= goal;
    }
    if (score > goal) score = goal;
    // TODO - Add a separate function to handle edge case such as UHC's 'MOVING_UP'
    description = description.replace('%s', addCommas(goal));
    name += ` ${tier}`;
    percent = (score === 0)
      ? 0
      : (score / goal);
    progression = `${score}/${goal} (${Math.floor((score / goal) * 100)}%)`;
  }
  const height = 25;
  const imagePath = (type === 'one_time')
    ? '/assets/hypixel/diamond.png'
    : '/assets/hypixel/diamond_block.png';
  return (
    <AchievementContainer>
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <img src={imagePath} alt="" style={{ height: '52px', padding: '5px' }} />
          <div style={{ flexDirection: 'column' }}>
            <h4 style={{ margin: 0, color: constants.colorGold }}>{name}</h4>
            <p style={{ margin: 0 }}>{description}</p>
          </div>
        </div>
        <ProgressBar
          title="test"
          percent={percent}
          height={25}
          content={(
            <span style={{
              bottom: -height,
              marginTop: -22,
              marginLeft: '5px',
              paddingLeft: '10px',
              position: 'relative',
              float: 'left',
              zIndex: '1',
              justifyContent: 'center',
            }}
            >
              {progression}
            </span>
)}
        />
      </div>
    </AchievementContainer>
  );
}

class MenuItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Arcade',
    };
  }

  handleClick = (name) => {
    this.props.onSelectedGame(name);
    this.setState({
      active: name,
    });
  };

  render() {
    const { games } = this.props;
    return (
      <div>
        {Object.keys(games).map((key) => {
          const { active } = this.state;
          const { completed } = games[key];
          const { total } = achievementData[key];
          const name = getName(key);
          const percent = completed / total;
          const height = 25;
          const Content = () => (
            <div
              role="menuitem"
              tabIndex={0}
              onClick={() => this.handleClick(key)}
              onKeyPress={() => this.handleClick(key)}
            >
              <NavigationArrowForward
                style={{
                  height: '15px',
                  width: '15px',
                  marginTop: -22,
                  bottom: -height,
                  position: 'relative',
                  float: 'left',
                  zIndex: '1',
                }}
              />
              <span style={{
                fontWeight: active === key ? 'bold' : 'normal',
                color: active === key ? 'white' : 'rgba(255,255,255,0.8)',
                bottom: -height,
                marginTop: -22,
                marginLeft: '5px',
                paddingLeft: '10px',
                position: 'relative',
                float: 'left',
                zIndex: '1',
              }}
              >
                {name}
              </span>
              <span style={{
                fontWeight: active === key ? 'bold' : 'normal',
                color: active === key ? 'white' : 'rgba(255,255,255,0.8)',
                bottom: -height,
                marginTop: -22,
                paddingRight: '10px',
                position: 'relative',
                float: 'right',
                zIndex: '1',
              }}
              >
                {`${completed}/${total}`}
              </span>
            </div>
          );
          return (
            <div
              style={{
                margin: '10px 0',
              }}
              key={key}
            >
              <ProgressBar
                title={key}
                percent={percent}
                height={height}
                content={<Content />}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const getData = (props) => {
  props.getPlayerAchievements(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      game: 'general',
    };
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  handleGameChange = (game) => {
    this.setState({
      game,
    });
  };

  render() {
    const { loading, achievements } = this.props;
    const { game } = this.state;
    if (loading) {
      return null;
    }
    return (
      <StyledPageContainer>
        <StyledContainer>
          <StyledHeaderContainer>
            <HeaderCard
              subtitle="Achievement points"
              title={<div className="colorGold">{addCommas(achievements.achievement_points)}</div>}
            />
            <HeaderCard
              subtitle="Completed"
              title={<div className="colorDarkAqua">{addCommas(achievements.completed_total)}</div>}
            />
            <MenuItems games={achievements.games} onSelectedGame={this.handleGameChange} />
            <div />
          </StyledHeaderContainer>
          <StyledContainer>
            <div style={{ flexDirection: 'column', paddingLeft: '20px' }}>
              {
                 Object.keys(achievements.games[game].tiered).map((key) => {
                   if (!(key in achievementData[game].tiered)) return null;
                   return (
                     getAchievementContainer('tiered', game, key, achievements.games[game].tiered[key])
                   );
                 })
              }
              {
                achievements.games[game].one_time.map((key, index) => {
                  if (!(key in achievementData[game].one_time)) return null;
                  return (
                    getAchievementContainer('one_time', game, achievements.games[game].one_time[index])
                  );
                })
              }
            </div>
          </StyledContainer>
        </StyledContainer>
      </StyledPageContainer>
    );
  }
}

RequestLayer.propTypes = {
  achievements: PropTypes.shape({}),
  loading: PropTypes.string,
};

const mapStateToProps = state => ({
  achievements: state.app.playerAchievements.data,
  error: state.app.playerAchievements.error,
  loading: state.app.playerAchievements.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerAchievements: (playerId, options) => dispatch(getPlayerAchievements(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
