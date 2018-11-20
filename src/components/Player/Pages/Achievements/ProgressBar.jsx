import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

function getColor(pct) {
  if (pct >= 0.8) {
    return '#005609';
  } if (pct >= 0.6) {
    return '#019300';
  } if (pct >= 0.4) {
    return '#969600';
  } if (pct >= 0.2) {
    return '#ad5f00';
  }
  return '#a81515';
}

const ProgressBar = ({
  percent, height, content,
}) => (
  <div>
    {content}
    <LinearProgress style={{ height, backgroundColor: 'rgba(0, 0, 0, .25)' }} mode="determinate" value={percent * 100} color={getColor(percent)} />
  </div>
);

ProgressBar.propTypes = {
  percent: PropTypes.number,
  height: PropTypes.number,
  content: PropTypes.element,
};

export default ProgressBar;
