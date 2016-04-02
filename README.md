# Redux Meta Reducer
A redux higher order reducer to simplify the state of fetched data. Reduces the amount of boilerplate in reducers and allows for separation of  meta data from fetched data.

## Examples
Examples can be found in [examples](/examples).

## Setup
Install via npm.

```sh
npm install --save redux-meta-reducer
```

Import the createMeta higher order function. With ES2015 modules:

```javascript
import createMeta from 'redux-meta-reducer';
```

Or with ES5 and CommonJS (* don't forget _.default_):
```javascript
var createMeta = require('redux-meta-reducer').default;
```

## Using it
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

const reducer = combineReducers({
  meta: createMeta({
    request: 'REQUEST_USERS',
    success: 'RECEIVE_USERS_SUCCESS',
    failure: 'RECEIVE_USERS_FAILURE',
  }),
  resource,
});

reducer(); /* =>
{
  meta: { isFetching: false, lastUpdated: '', error: false },
  resource: { users: [] }
}
*/
```

## Why?
This library may be better suited for a gist (copy/paste), however I find keeping isFetching / lastUpdated / error states along side state to be extremely common. Abstracting this into a reusable and testable higher order reducer seemed like a good idea.
