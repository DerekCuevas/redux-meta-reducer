export default function createMeta(type) {
  let sameActionType = true;
  let actionTypes = { request: 'request', success: 'success', failure: 'failure' };

  if (typeof type === 'string') {
    if (!type.length) {
      throw new Error('Missing action type given to createMeta.');
    }
  } else {
    const { request, success, failure } = type;
    if (!request || !success || !failure) {
      throw new Error('Missing or invalid action type(s) given to createMeta.');
    }
    sameActionType = false;
    actionTypes = { request, success, failure };
  }

  const initialState = { isFetching: false, lastUpdated: undefined, error: false };

  return (state = initialState, action = {}) => {
    const { error = true } = action;

    if (sameActionType && action.type !== type) {
      return state;
    }

    switch (sameActionType ? action.status : action.type) {
      case actionTypes.request:
        return Object.assign({}, state, { isFetching: true });
      case actionTypes.success:
        return { isFetching: false, lastUpdated: action.now, error: false };
      case actionTypes.failure:
        return { isFetching: false, lastUpdated: action.now, error };
      default:
        return state;
    }
  };
}
