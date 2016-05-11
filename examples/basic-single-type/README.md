# Basic Single Type
This example will log (with redux-logger) previous and current states before and after every action made to our root reducer. After startup, open the developer console in your browser to see the logs. Refer to [index.js](index.js#L45) for the corresponding dispatches.

This example uses a single action type for request, success, and failure actions. The meta state will update according to the `action.status` field.

## To run
```sh
npm install
npm start
```
