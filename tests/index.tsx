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
});
