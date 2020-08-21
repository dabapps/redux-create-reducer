# redux-create-reducer

**A utility to create redux reducers from a set of handlers**

## About

This is a fork of [@jakesidsmith/redux-create-reducer](https://github.com/jakesidsmith/redux-create-reducer).

This utility removes the need for switch statements (which can easily result in errors), and instead allows you to create a redux reducer from a set of handler functions - no more need to handle a default case, no more boilerplate.

This library is written in TypeScript and due to how the handlers are typed, allows you to limit which actions they handle, and also define different action types for different handlers without casting their types.

## Install

```shell
npm i @dabapps/redux-create-reducer -S
```

## Usage

```ts
import { createReducer } from '@dabapps/redux-create-reducer';
import { ADD, SUBTRACT, RESET } from './action-types';

interface NumberAction {
  type: string;
  payload: number;
}

export const count = createReducer(
  {
    [ADD]: (state: number, action: NumberAction) => state + action.payload,
    [SUBTRACT]: (state: number, action: NumberAction) => state - action.payload,
    [RESET]: () => 0,
  },
  0 // Initial state (required)
);
```

## Updating this fork from upstream

Ensure you have added a remote upstream in git e.g.

```shell
git remote add upstream git@github.com:JakeSidSmith/redux-create-reducer.git
```

Create a new branch (from master) and run the following to pull changes from [upstream](https://github.com/jakesidsmith/redux-create-reducer):

```shell
git fetch upstream
git pull upstream master
```
