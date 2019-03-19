import { createReducer } from '../src';

describe('createReducer', () => {
  it('returns a reducer function', () => {
    const reducer = createReducer({}, {});

    expect(typeof reducer).toBe('function');
  });

  it('returns the initialState when an unknown action is emitted', () => {
    const reducer = createReducer<number>(
      {
        foo: state => state + 1,
      },
      0
    );

    expect(reducer(undefined, { type: 'bar' })).toBe(0);
    expect(reducer(undefined, { type: 'foo' })).toBe(1);
  });

  it('should error if invalid handler keys are used', () => {
    const MATCHES_INVALID_KEY = /invalid/i;

    expect(() => createReducer({ undefined: () => ({}) }, {})).toThrow(
      MATCHES_INVALID_KEY
    );
    expect(() => createReducer({ null: () => ({}) }, {})).toThrow(
      MATCHES_INVALID_KEY
    );
    expect(() => createReducer({ okay: () => ({}) }, {})).not.toThrow(
      MATCHES_INVALID_KEY
    );
  });
});
