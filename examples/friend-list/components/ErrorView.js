import React, { PropTypes } from 'react';

const propTypes = {
  message: PropTypes.string,
};

const defaultProps = {
  message: '',
};

function ErrorView({ message }) {
  return (
    <div className="error-view">
      <h4>
        <i className="fa fa-exclamation-circle"></i> {message}
        <span className="details"> <i>Press enter to try again.</i></span>
      </h4>
    </div>
  );
}

ErrorView.propTypes = propTypes;
ErrorView.defaultProps = defaultProps;

export default ErrorView;
