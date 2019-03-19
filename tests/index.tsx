import { createReducer, Handlers } from '../src';

describe('createReducer', () => {
  const MATCHES_INVALID_KEY = /\binvalid\b.+\bkey\b/i;
  const MATCHES_INVALID_INITIAL_STATE = /\binvalid\b.+\initialState\b/i;
  const MATCHES_INVALID_HANDLERS = /\binvalid\b.+\handlers\b/i;

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

  it('should error if the initial state is undefined', () => {
    expect(() =>
      createReducer<null | undefined>(
        { foo: () => null },
        (undefined as unknown) as null
      )
    ).toThrow(MATCHES_INVALID_INITIAL_STATE);
  });

  it('should error if the handlers are not a string keyed object', () => {
    expect(() =>
      createReducer((null as unknown) as Handlers<any, any>, null)
    ).toThrow(MATCHES_INVALID_HANDLERS);
    expect(() =>
      createReducer(([] as unknown) as Handlers<any, any>, null)
    ).toThrow(MATCHES_INVALID_HANDLERS);
    expect(() =>
      createReducer((undefined as unknown) as Handlers<any, any>, null)
    ).toThrow(MATCHES_INVALID_HANDLERS);
  });
});
