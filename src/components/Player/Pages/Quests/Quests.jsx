import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestCalendar from './QuestCalendar';
import { getPlayerQuests } from '../../../../actions';
import Container from '../../../Container';

const defaultOptions = {
  limit: null,
};

const Quest = ({
  error, loading, strings, data,
}) => (
  <Container title={strings.tab_quests} subtitle={strings.activity_subtitle} error={error} loading={loading}>
    <QuestCalendar strings={strings} data={data} />
  </Container>
);

Quest.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

const getData = (props) => {
  props.getPlayerMatches(props.playerId, props.location.search);
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
    const { playerId } = this.props;
    const { key } = this.props.location;
    if (
      playerId !== prevProps.playerId
      || key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Quest {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerQuests.data,
  loading: state.app.playerQuests.loading,
  error: state.app.playerQuests.error,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerQuests(playerId, options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestLayer);
