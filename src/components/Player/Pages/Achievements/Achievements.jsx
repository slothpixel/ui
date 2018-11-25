/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { achievements_extended as achievementData, game_types as gameTypes } from 'hypixelconstants';
import addCommas from '../../../../utility';
import { getPlayerAchievements } from '../../../../actions';
import { HeaderCard } from './Styled';
// import { PlayerStatsCard } from '../../Header/Styled';
import constants from '../../../constants';
import ProgressBar from './ProgressBar';
// import Table from '../../../Table';
// import Container from '../../../Container';
// import playerAchievementsColumns from './playerAchievementsColumns';

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
    default: {
      const temp = gameTypes.find(game => game.standard_name === name);
      result = temp === undefined ? name : temp.clean_name;
    }
  }
  return result;
}

const Overview = ({
  achievement_points,
  completed_total,
  games,
}) => (
  <StyledHeaderContainer>
    <HeaderCard
      subtitle="Achievement points"
      title={<div className="colorGold">{addCommas(achievement_points)}</div>}
    />
    <HeaderCard
      subtitle="Completed"
      title={<div className="colorDarkAqua">{addCommas(completed_total)}</div>}
    />
    <div>
      {Object.keys(games).map((key) => {
        const { completed } = games[key];
        const { total } = achievementData[key];
        const percent = completed / total;
        const height = 25;
        const Content = () => (
          <div>
            <span style={{
              bottom: -height, marginTop: -height, paddingLeft: '10px', position: 'relative', float: 'left', zIndex: '1',
            }}
            >
              {getName(key)}
            </span>
            <span style={{
              bottom: -height, marginTop: -height, paddingRight: '10px', position: 'relative', float: 'right', zIndex: '1',
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
  </StyledHeaderContainer>
);

Overview.propTypes = {
  achievement_points: PropTypes.number,
  completed_total: PropTypes.number,
  games: PropTypes.shape({}),
};

const Achievements = ({
  achievements, loading,
}) => {
  if (loading) {
    return null;
  }
  return (
    <StyledContainer>
      <Overview {...achievements} />
      {/* {Object.keys(achievements).map(key => (
      <StyledTableContainer key={key}>
        <Container title={strings[`heading_${key}`]} error={error} loading={loading}>
          <Table columns={playerAchievementsColumns(strings)} data={achievements[key].list} />
        </Container>
      </StyledTableContainer>
    ))} */}
    </StyledContainer>
  );
};

Achievements.propTypes = {
  achievements: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array,
  ]),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

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

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return (
      <Achievements {...this.props} />
    );
  }
}

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
