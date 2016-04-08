import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

const defaultProps = {
  name: '',
  username: '',
};

function FriendThumbnail({ name, username }) {
  return (
    <h4 className="friend-thumbnail">
      {name} <span className="username">{username}</span>
    </h4>
  );
}

FriendThumbnail.propTypes = propTypes;
FriendThumbnail.defaultProps = defaultProps;

export default FriendThumbnail;
