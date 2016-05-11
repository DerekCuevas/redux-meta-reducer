export const types = {
  request: '@@META/REQUEST',
  success: '@@META/SUCCESS',
  failure: '@@META/FAILURE',
};

export const type = '@@META/FETCH';

export function request(singleType = false) {
  if (singleType) {
    return { type, status: 'request' };
  }
  return { type: types.request };
}

export function responseSuccess(singleType = false, now) {
  if (singleType) {
    return { type, status: 'success', now };
  }
  return { type: types.success, now };
}

export function responseFailure(singleType = false, now, error) {
  if (singleType) {
    return { type, status: 'failure', now, error };
  }
  return { type: types.failure, now, error };
}
