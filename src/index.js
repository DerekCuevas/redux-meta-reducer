export default function createMeta({ request, success, failure } = {}) {
  if (!request || !success || !failure) {
    throw new Error('Missing or invalid action type(s) given to createMeta.');
  }

  const initialState = { isFetching: false, lastUpdated: undefined, error: false };

  return (state = initialState, action = {}) => {
    const { error = true } = action;

    switch (action.type) {
      case request:
        return Object.assign({}, state, { isFetching: true });
      case success:
        return { isFetching: false, lastUpdated: action.now, error: false };
      case failure:
        return { isFetching: false, lastUpdated: action.now, error };
      default:
        return state;
    }
  };
}
