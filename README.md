# Redux Meta Reducer
A [redux](https://github.com/reactjs/redux) higher order reducer to simplify the state of fetched data. Reduces the amount of boilerplate in reducers and allows for separation of meta data from fetched data :collision:.

## Why?
Keeping isFetching, lastUpdated, and error states (I'm calling this meta state) along side fetched state is common. Replicating logic of how to update this meta state across multiple reducers can be mundane and repetitive. This library abstracts meta state into a reusable and testable higher order reducer that comes preloaded with the ability to update these meta states according to specified request, success, and failure action types.

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
Create a meta reducer with the createMeta HOF specifying the desired request, success, and failure action types. Use redux's [combineReducers](http://redux.js.org/docs/api/combineReducers.html) to functionally compose the created meta reducer into your fetched resource reducer.

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
The meta state will respond to all three action types:
- **request**:
The isFetching flag will be set to true.
- **success**:
The isFetching flag is set to false, lastUpdated will be set to `action.now`, and error will be set to false.
- **failure**:
The isFetching flag is set to false, lastUpdated will be set to `action.now`, and error will be set to `action.error` which can be an error object describing the error.

## Examples
Currently there are two examples, check out the [basic](/examples/basic) example for the bare minimum setup and [friend-list](/examples/friend-list) for a more realistic react/redux example.

## Contributing
Want to contribute? File an issue or send in a PR. I am currently interested in ways to make createMeta more extensible, such as adding the ability to easily extend or alter the behavior of the meta reducer. However I have not yet thought of a good way to do this. If you have any ideas please let me know!
