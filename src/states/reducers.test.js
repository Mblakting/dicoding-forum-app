import { describe, it, expect } from 'vitest';
import {
  authUserReducer, isPreloadReducer, usersReducer, threadsReducer,
} from './index';

describe('Reducers Test', () => {
  it('1. authUser reducer mengembalikan null secara default', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer.reducer(initialState, action);
    expect(nextState).toBe('INTENTIONAL_FAIL');
  });

  it('2. isPreload reducer mengembalikan true secara default', () => {
    const nextState = isPreloadReducer.reducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toBe(true);
  });

  it('3. users reducer mengembalikan array kosong secara default', () => {
    const nextState = usersReducer.reducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual([]);
  });

  it('4. threads reducer mengembalikan array kosong secara default', () => {
    const nextState = threadsReducer.reducer(undefined, { type: 'UNKNOWN' });
    expect(nextState).toEqual([]);
  });
});
