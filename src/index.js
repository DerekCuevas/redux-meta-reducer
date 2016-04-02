export default function createMeta({ request, success, failure } = {}) {
  if (!request || !success || !failure) {
    throw new Error('Missing or invalid action type(s) given to createMeta.');
  }

  const initialState = { isFetching: false, lastUpdated: '', error: false };

  return (state = initialState, action = {}) => {
    const { now = '', error = true } = action;

    switch (action.type) {
      case request:
        return { isFetching: true, lastUpdated: state.lastUpdated, error: false };
      case success:
        return { isFetching: false, lastUpdated: now, error: false };
      case failure:
        return { isFetching: false, lastUpdated: now, error };
      default:
        return state;
    }
  };
}
