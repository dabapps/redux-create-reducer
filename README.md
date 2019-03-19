# redux-create-reducer

**A utility to create redux reducers from a set of handlers**

[![CircleCI](https://circleci.com/gh/JakeSidSmith/redux-create-reducer.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/redux-create-reducer)

## About

This utility removes the need for switch statements (which can easily result in errors), and instead allows you to create a redux reducer from a set of handler functions - no more need to handle a default case, no more boilerplate.

This library is written in TypeScript and due to how the handlers are typed, allows you to limit which actions they handle, and also define different action types for different handlers.

## Install

```shell
npm i @jakesidsmith/redux-create-reducer -S
```

## Usage

```js
import { createReducer } from '@jakesidsmith/redux-create-reducer';
import { ADD, SUBTRACT, RESET } from './action-types';

export const count = createReducer(
  {
    [ADD]: (state, action) => state + action.payload,
    [SUBTRACT]: (state, action) => state - action.payload,
    [RESET]: () => 0,
  },
  0 // Initial state (required)
);
```

## TypeScript

You can supply a generic type for the reducer state, and the actions it should handle:

```ts
interface NumberAction {
  type: string;
  payload: number;
}

export const count = createReducer<number, NumberAction>(
  // ...
);
```

You can use the action generic parameter to narrow the available handlers by setting specific `type` keys:

```ts
interface NumberAction {
  type: 'ADD' | 'SUBTRACT' | 'RESET';
  payload: number;
}

export const count = createReducer<number, NumberAction>(
  {
    // ...
    // The next line will have a type error because MULTIPLY was not defined in our type interface
    [MULTIPLY]: (state, action) => state * action.payload,
  },
  // ...
);
```
