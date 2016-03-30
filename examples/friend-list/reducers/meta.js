export default function createMeta({ request, success, failure }) {
  const initialState = { isFetching: false, lastUpdated: '', error: false };

  return (state = initialState, action = {}) => {
    const { now = '', error = false } = action;

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
