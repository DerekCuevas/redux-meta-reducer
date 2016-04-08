import search from '../api';
import * as types from '../constants/actionTypes';

export function setQuery(query) {
  return { type: types.SET_QUERY, query };
}

export function requestFriends() {
  return { type: types.REQUEST_FRIENDS };
}

export function receiveFriendsSuccess(friends) {
  return { type: types.RECEIVE_FRIENDS_SUCCESS, friends, now: Date.now() };
}

export function receiveFriendsFailure(error) {
  return { type: types.RECEIVE_FRIENDS_FAILURE, error, now: Date.now() };
}

export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { search: { query } } = getState();

    dispatch(requestFriends());

    search(query, (error, friends) => {
      if (error) {
        return dispatch(receiveFriendsFailure(error));
      }

      const { search: { query: currentQuery } } = getState();
      if (query === currentQuery) {
        history.push({
          query: { q: query || undefined },
        });
        dispatch(receiveFriendsSuccess(friends));
      }
    });
  };
}
