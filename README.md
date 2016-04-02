# Redux Meta Reducer
A redux higher order reducer to simplify the state of fetched data. Reduces the amount of boilerplate in reducers and allows for separation of  meta data from fetched data.

## Why?
Keeping isFetching, lastUpdated, and error states (I'm calling this meta state) along side fetched state is common and replicating logic of how to update meta state across multiple reducers can be mundane and repetitive. This library abstracts meta state into a reusable and testable higher order reducer that comes preloaded with the ability to update these meta-states according to specified request, success, and failure action types.

## Setup
Install via npm.

```sh
npm install --save redux-meta-reducer
```

Import the createMeta higher order function. With ES2015 modules:

```javascript
import createMeta from 'redux-meta-reducer';
```

Or with ES5 and CommonJS (don't forget _.default_):
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
      return { users: action.users };
    case 'RECEIVE_USERS_FAILURE':
      return { users: [] };
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

## Examples
Examples can be found in [examples](/examples).
