# redux-create-reducer

**A utility to create redux reducers from a set of handlers**

[![CircleCI](https://circleci.com/gh/JakeSidSmith/redux-create-reducer.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/redux-create-reducer)

## About

This utility removes the need for switch statements (which can easily result in errors), and instead allows you to create a redux reducer from a set of handler functions - no more need to handle a default case, no more boilerplate.

This library is written in TypeScript and due to how the handlers are typed, allows you to limit which actions they handle, and also define different action types for different handlers.
