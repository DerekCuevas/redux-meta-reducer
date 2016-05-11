import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createMeta from 'redux-meta-reducer';

const initialState = {
  users: [],
};

function resource(state = initialState, action = {}) {
  if (action.type === 'FETCH_USERS') {
    switch (action.status) {
      case 'success':
        return { users: action.users };
      case 'failure':
        return { users: [] };
      default:
        return state;
    }
  }
  return state;
}

// create the root reducer (using single action type)
const reducer = combineReducers({
  meta: createMeta('FETCH_USERS'),
  resource,
});

// example action creators (status field is now required)
function requestUsers() {
  return { type: 'FETCH_USERS', status: 'request' };
}

function receiveUsersSuccess(users) {
  return { type: 'FETCH_USERS', status: 'success', now: Date.now(), users };
}

function receiveUsersFailure(error) {
  return { type: 'FETCH_USERS', status: 'failure', now: Date.now(), error };
}

const store = createStore(reducer, applyMiddleware(createLogger()));

// see the developer console for logging of previous/current states
store.dispatch(requestUsers());
store.dispatch(receiveUsersSuccess(['me', 'you']));

store.dispatch(requestUsers());
store.dispatch(receiveUsersFailure({ msg: 'Ah! Error!' }));

store.dispatch(requestUsers());
store.dispatch(receiveUsersSuccess(['him', 'her']));
