import { createReducer } from '../src';

describe('createReducer', () => {
  const MATCHES_INVALID_KEY = /\binvalid\b.+\bkey\b/i;
  const MATCHES_INVALID_INITIAL_STATE = /\binvalid\b.+\initialState\b/i;
  const MATCHES_INVALID_HANDLERS = /\binvalid\b.+\handlers\b/i;

  it('returns a reducer function', () => {
    const reducer = createReducer({}, {});

    expect(typeof reducer).toBe('function');
  });

  it('returns the initialState when an unknown action is emitted', () => {
    const reducer = createReducer(
      {
        foo: (state: number) => state + 1,
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
      createReducer({ foo: () => null }, (undefined as unknown) as null)
    ).toThrow(MATCHES_INVALID_INITIAL_STATE);
  });

  it('should error if the handlers are not a string keyed object', () => {
    expect(() => createReducer(null as any, null)).toThrow(
      MATCHES_INVALID_HANDLERS
    );
    expect(() => createReducer([] as any, null)).toThrow(
      MATCHES_INVALID_HANDLERS
    );
    expect(() => createReducer(undefined as any, null)).toThrow(
      MATCHES_INVALID_HANDLERS
    );
  });

  it('should handler multiple actions (including symbols)', () => {
    interface NumberAction {
      type: string | symbol;
      payload: number;
    }

    const ADD = Symbol('ADD');
    const add = (count: number): NumberAction => ({
      type: ADD,
      payload: count,
    });
    const SUB = Symbol('SUB');
    const sub = (count: number): NumberAction => ({
      type: SUB,
      payload: count,
    });

    const reducer = createReducer(
      {
        [ADD]: (state: number, action: NumberAction) => state + action.payload,
        [SUB]: (state: number, action: NumberAction) => state - action.payload,
      },
      5
    );

    expect(reducer(undefined, { type: 'unknown', payload: NaN })).toBe(5);
    expect(reducer(undefined, add(2))).toBe(7);
    expect(reducer(1, add(2))).toBe(3);
    expect(reducer(undefined, sub(3))).toBe(2);
    expect(reducer(10, sub(2))).toBe(8);
  });
});
