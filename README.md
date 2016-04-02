# Redux Meta Reducer
A redux higher order reducer to simplify the state of fetched data. Reduces the amount of boilerplate in reducers and allows for separation of  meta data from fetched data.

Turn this:
```javascript
const initialState = {
  isFetching: false,
  lastUpdated: '',
  resource: {
    users: [],
  }
  error: false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_USERS':
      return {
        ...state,
        sFetching: true
      };
    case 'RECEIVE_USERS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.now,
        resource: {
          users: action.users,
        },
        error: false,
      };
    case 'RECEIVE_USERS_FAILURE':
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.now,
        resource: {
          users: [],
        },
        error: action.error,
      };
    default:
      return state;
  }
}
```

Into this:
```javascript
import createMeta from 'redux-meta-reducer';
import { combineReducers } from 'redux';

const initialState = {
  users: [],
};

function resource(state = initialState, action = {}) {
  switch (action.type) {
    case 'RECEIVE_USERS_SUCCESS':
      return { ...state, users: action.users };
    case 'RECEIVE_USERS_FAILURE':
      return { ...state, users: [] };
    default:
      return state;
  }
}

/* our initial state will now be:
{
  meta: {
    isFetching: false,
    lastUpdated: '',
    error: false,
  },
  resource: {
    users: [],
  }
}
*/
const reducer = combineReducers({
  meta: createMeta({
    request: 'REQUEST_USERS',
    success: 'RECEIVE_USERS_SUCCESS',
    failure: 'RECEIVE_USERS_FAILURE',
  }),
  resource,
});

```

## Setup
Install via npm.

```sh
npm install --save redux-meta-reducer
```

Import the createMeta higher order function.

```javascript
import createMeta from 'redux-meta-reducer';
```

## Examples
Examples can be found in [examples](/examples).

## Using it
