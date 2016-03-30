import React, { PropTypes } from 'react';
import FriendThumbnail from './FriendThumbnail';

const propTypes = {
  isFetching: PropTypes.bool,
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })),
};

const defaultProps = {
  isFetching: false,
  friends: [],
};

function FriendList({ isFetching, friends }) {
  return (
    <ul className={`friend-list ${isFetching ? 'loading' : ''}`}>
      {friends.map(friend => (
        <li key={friend.id}>
          <FriendThumbnail name={friend.name} username={friend.username} />
        </li>
      ))}
    </ul>
  );
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

export default FriendList;
