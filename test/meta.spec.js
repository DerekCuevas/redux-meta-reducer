import expect from 'expect';
import createMeta from '../src';

describe('createMeta', () => {
  // mock types for testing only
  const types = {
    request: '@@META/REQUEST',
    success: '@@META/SUCCESS',
    failure: '@@META/FAILURE',
  };

  const initialState = {
    isFetching: false,
    lastUpdated: '',
    error: false,
  };

  it('Should return a function.', () => {
    const meta = createMeta(types);
    expect(meta).toExist();
    expect(typeof meta).toEqual('function');
  });

  it('Should throw if any types are undefined or empty.', () => {
    expect(createMeta).toThrow();
    expect(createMeta).withArgs({
      request: '',
      success: 'should-throw',
      failure: 'should-still-throw',
    }).toThrow();
  });

  describe('Meta reducer', () => {
    it('Should return the correct initial state.', () => {
      expect(createMeta(types)()).toEqual(initialState);
    });

    it('Should set isFetching flag on request.', () => {
      const meta = createMeta(types);

      expect(meta(initialState, { type: types.request })).toEqual({
        isFetching: true,
        lastUpdated: '',
        error: false,
      });

      expect(meta({
        isFetching: true,
        lastUpdated: '',
        error: false,
      }, { type: types.request })).toEqual({
        isFetching: true,
        lastUpdated: '',
        error: false,
      });
    });

    it('Should reset isFetching flag, update lastUpdated and clear error on success.', () => {
      const meta = createMeta(types);

      expect(meta({
        isFetching: true,
        lastUpdated: '',
        error: false,
      }, { type: types.success, now: 'now' })).toEqual({
        isFetching: false,
        lastUpdated: 'now',
        error: false,
      });

      expect(meta({
        isFetching: true,
        lastUpdated: 'before',
        error: { message: 'Previous error.' },
      }, { type: types.success, now: 'now' })).toEqual({
        isFetching: false,
        lastUpdated: 'now',
        error: false,
      });
    });

    it('Should reset isFetching flag, update lastUpdated and set error object on failure.', () => {
      const meta = createMeta(types);

      expect(meta({
        isFetching: true,
        lastUpdated: '',
        error: false,
      }, { type: types.failure, now: 'now', error: { message: 'error' } })).toEqual({
        isFetching: false,
        lastUpdated: 'now',
        error: { message: 'error' },
      });

      expect(meta({
        isFetching: true,
        lastUpdated: '',
        error: { message: 'old error' },
      }, { type: types.failure, now: 'now', error: { message: 'new error' } })).toEqual({
        isFetching: false,
        lastUpdated: 'now',
        error: { message: 'new error' },
      });
    });
  });
});
