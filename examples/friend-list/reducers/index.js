import createMeta from 'redux-meta-reducer';
import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

const initialState = {
  query: '',
  friends: [],
};

function search(state = initialState, action = {}) {
  const { query = '', friends = [] } = action;

  switch (action.type) {
    case types.SET_QUERY:
      return Object.assign({}, state, { query });

    case types.RECEIVE_FRIENDS_SUCCESS:
      return Object.assign({}, state, { friends });

    case types.RECEIVE_FRIENDS_FAILURE:
      return Object.assign({}, state, { friends: [] });

    default:
      return state;
  }
}

export default combineReducers({
  meta: createMeta({
    request: types.REQUEST_FRIENDS,
    success: types.RECEIVE_FRIENDS_SUCCESS,
    failure: types.RECEIVE_FRIENDS_FAILURE,
  }),
  search,
});
