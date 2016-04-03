import React, { PropTypes } from 'react';

const propTypes = {
  lastUpdated: PropTypes.string,
};

const defaultProps = {
  lastUpdated: '',
};

function Stats({ lastUpdated }) {
  return <span className="stats">Last Updated: {lastUpdated}</span>;
}

Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default Stats;
