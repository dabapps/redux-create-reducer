import { Action, AnyAction, Reducer } from 'redux';

const INVALID_HANDLER_KEYS = ['undefined', 'null'];

export type Handlers<S, A extends Action = AnyAction> = {
  [P in A['type']]: (state: S, action: A) => Exclude<S, undefined>
};

function validateKeys(handlers: Handlers<any, any>) {
  INVALID_HANDLER_KEYS.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(handlers, key)) {
      throw new Error(`Invalid createReducer handler key: ${key}`);
    }
  });
}

export function createReducer<S, A extends Action = AnyAction>(
  handlers: Handlers<S, A>,
  initialState: Exclude<S, undefined>
): Reducer<S, A> {
  if (
    !handlers ||
    typeof (handlers as Handlers<S, A> | undefined) !== 'object' ||
    Array.isArray(handlers)
  ) {
    throw new Error(
      'Invalid createReducer handlers - must be a string keyed object'
    );
  }

  if (typeof (initialState as S | undefined) === 'undefined') {
    throw new Error('Invalid createReducer initialState value: undefined');
  }

  validateKeys(handlers);

  return (state: S = initialState, action: A): S => {
    const { type } = action;

    if (Object.prototype.hasOwnProperty.call(handlers, type)) {
      return handlers[type as keyof Handlers<S, A>](state, action);
    }

    return state;
  };
}
