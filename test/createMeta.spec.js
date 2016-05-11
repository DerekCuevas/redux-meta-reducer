import expect from 'expect';
import createMeta from '../src';
import { types, type, request, responseSuccess, responseFailure } from './helpers';

describe('createMeta', () => {
  it('Should return a reducer function.', () => {
    const meta = createMeta(types);
    const metaSingleType = createMeta(type);

    expect(meta).toExist();
    expect(typeof meta).toEqual('function');

    expect(metaSingleType).toExist();
    expect(typeof metaSingleType).toEqual('function');
  });

  it('Should throw if any types are undefined or empty.', () => {
    expect(createMeta).toThrow();
    expect(createMeta).withArgs('').toThrow();
    expect(createMeta).withArgs({
      request: '',
      success: 'should-throw',
      failure: 'should-still-throw',
    }).toThrow();
  });

  describe('Meta reducer', () => {
    const initialState = {
      isFetching: false,
      lastUpdated: undefined,
      error: false,
    };

    it('Should return the correct initial state.', () => {
      expect(createMeta(types)()).toEqual(initialState);
      expect(createMeta(type)()).toEqual(initialState);
    });

    it('Should set isFetching flag on request.', () => {
      const meta = createMeta(types);
      const metaSingleType = createMeta(type);

      const nextState = {
        isFetching: true,
        lastUpdated: undefined,
        error: false,
      };

      expect(meta(initialState, request())).toEqual(nextState);
      expect(metaSingleType(initialState, request(true))).toEqual(nextState);
    });

    it('Should preserve previous lastUpdated and error states on request.', () => {
      const meta = createMeta(types);
      const metaSingleType = createMeta(type);

      const state = {
        isFetching: false,
        lastUpdated: 'before',
        error: { msg: 'Old error!' },
      };

      const nextState = {
        isFetching: true,
        lastUpdated: 'before',
        error: { msg: 'Old error!' },
      };

      expect(meta(state, request())).toEqual(nextState);
      expect(metaSingleType(state, request(true))).toEqual(nextState);
    });

    it('Should reset isFetching flag, update lastUpdated, and clear error on success.', () => {
      const meta = createMeta(types);
      const metaSingleType = createMeta(type);

      const state = {
        isFetching: true,
        lastUpdated: 'before',
        error: { message: 'Previous error.' },
      };

      const nextState = {
        isFetching: false,
        lastUpdated: 'now',
        error: false,
      };

      expect(meta(state, responseSuccess(false, 'now'))).toEqual(nextState);
      expect(metaSingleType(state, responseSuccess(true, 'now'))).toEqual(nextState);
    });

    it('Should reset isFetching flag, update lastUpdated, and set error on failure.', () => {
      const meta = createMeta(types);
      const metaSingleType = createMeta(type);

      const state = {
        isFetching: true,
        lastUpdated: '',
        error: { message: 'old error' },
      };

      const nextState = {
        isFetching: false,
        lastUpdated: 'now',
        error: { message: 'new error' },
      };

      expect(meta(state, responseFailure(false, 'now', {
        message: 'new error',
      }))).toEqual(nextState);

      expect(metaSingleType(state, responseFailure(true, 'now', {
        message: 'new error',
      }))).toEqual(nextState);
    });

    it('Should set the correct parameter defaults.', () => {
      const meta = createMeta(types);
      const metaSingleType = createMeta(type);

      const state = {
        isFetching: true,
        lastUpdated: 'before',
        error: { message: 'old' },
      };

      const nextStateSuccess = {
        isFetching: false,
        lastUpdated: undefined,
        error: false,
      };

      const nextStateFailure = {
        isFetching: false,
        lastUpdated: undefined,
        error: true,
      };

      expect(meta(state, responseSuccess())).toEqual(nextStateSuccess);
      expect(meta(state, responseFailure())).toEqual(nextStateFailure);

      expect(metaSingleType(state, responseSuccess(true))).toEqual(nextStateSuccess);
      expect(metaSingleType(state, responseFailure(true))).toEqual(nextStateFailure);
    });
  });
});
