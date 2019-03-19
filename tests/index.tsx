import { createReducer } from '../src';

describe('createReducer', () => {
  it('returns a reducer function', () => {
    const result = createReducer({}, {});

    expect(typeof result).toBe('function');
  });
});
