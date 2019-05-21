import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Arena } from './Games';

const Stats = ({ loading, strings, player }) => {
  if (loading) {
    return null;
  }
  return (
    <div>
      <Arena strings={strings} arenaData={player.stats.Arena} />
    </div>
  );
};

Stats.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  strings: PropTypes.shape({}),
  loading: PropTypes.bool,
  player: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  player: state.app.player.data,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Stats);
