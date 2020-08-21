import { Action, Reducer } from 'redux';

const INVALID_HANDLER_KEYS = ['undefined', 'null'];

type NotUndefined = {} | null;

type ActionOfType<A extends Action, T> = Exclude<A, Exclude<A, { type: T }>>;

function validateKeys(handlers: Record<string, unknown>) {
  INVALID_HANDLER_KEYS.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(handlers, key)) {
      throw new Error(`Invalid createReducer handler key: ${key}`);
    }
  });
}

export function createReducer<
  S extends NotUndefined,
  A extends Action<T>,
  T extends string
>(
  handlers: {
    [P in T]: (state: S, action: ActionOfType<A, P>) => S;
  },
  initialState: S
): Reducer<S, ActionOfType<A, T>> {
  if (
    !handlers ||
    // tslint:disable-next-line:strict-type-predicates
    typeof handlers !== 'object' ||
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

  return (state: S = initialState, action: ActionOfType<A, T>): S => {
    const { type } = action;

    if (Object.prototype.hasOwnProperty.call(handlers, type)) {
      const handler = handlers[type];
      return handler(state, action);
    }

    return state;
  };
}
