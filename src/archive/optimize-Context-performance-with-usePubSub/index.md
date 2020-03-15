---
title: "Building a usePubSub Hook to optimize React.Context performance"
date: "2020-02-05T12:51:20.481Z"
---

React.Context is a great tool for sharing state across your application. It allows you to avoid "prop drilling", and doesn't require an additional library, such as Redux.

However, it does come at a cost; it can be difficult to manage performance when using Context since every change to its value will cause each component consuming that Context to rerender.

Recently I was building a feature, and after drilling props down 7+ levels I decided to incorporate Context. It worked very well, but I quickly noticed performance issues when one of the components would update the shared Context value.

## Sharing setState 

After some trial and error, I found a solution to the performance problem that involved storing each component's `setState` function inside of Context. Instead of updating the shared Context value, I called each of the component's `setState` functions that I wanted to receive the update. That way I had full control over which components rerendered! 

Note: to give yourself control of rerenders, each component will likely need to be nested into `React.memo`. See the codepen below for an example.

At first I was skeptical of this approach; it didn't seem right that I was passing `setState` up into a Context value and invoking it from the components' parent. But I realized it wasn't much different than passing an `onChange` handler down to a child component -- a very common practice. 

It shows what a powerful tool React Hooks are by bringing flexibility and composability into the world of state management!

## usePubSub

The idea of passing a change handler to a parent and allowing that parent to invoke changes may sound familiar; it's similar to what you see in the publish--subscribe design pattern. I thought it would be an interesting experiment to abstract the sharing of `setState` described above into its own custom hook -- `usePubSub`.

#### The API

The `usePubSub` API would consist of two things: 1) a `Provider` component to initialize Context & store state, and 2) a `usePubSub` hook that could be consumed by any component within `Provider`. 

`usePubSub` would return three things: `state` and `setState` to manage the components' state, and `publish` to send state changes off to each component. 

Each component would need an `id` prop as well so that there was a unique identifier for each component's `setState` function. 

```js
import { Provider, usePubSub } from './usePubSub';

const Component = ({ id }) => {
  const { state, setState, publish } = usePubSub(id);
  ...
}

<Provider initialState={...}>
  <Component />
</Provider>
```

#### The Code

Here is the code used to implement this feature, with comments describing what does what.

```js
import React, { useContext, useState, useRef } from "react";

// Holds the single "state" consumed by all components,
// as well as setState and publish.
const Context = React.createContext();

export const usePubSub = id => {
  // These values are set below in Provider.
  const { context, setContext, publish } = useContext(Context);

  // These functions will be unique to each component that invokes usePubSub.
  const [subscriberState, setSubscriberState] = useState(context.state[id]);

  // Updates both the component state and the Context state.
  const setState = state => {
    setSubscriberState(state);
    setContext(context => ({
      ...context,
      state: { ...context.state, [id]: state }
    }));
  };

  // This will add the component's setState function into the 
  // Context object. As rerenders happen, the setState function
  // may change. This ensures it is re-added if it changes.
  if (context.subscribers[id] !== setSubscriberState) {
    setContext(context => ({
      ...context,
      subscribers: { ...context.subscribers, [id]: setState }
    }));
  }

  return { state: subscriberState, setState, publish };
};

export const Provider = ({ initialState, children }) => {
  const [context, setContext] = useState({
    state: initialState,
    subscribers: {}
  });

  // This is key to avoiding rerenders. It ensures the Provider value always 
  // keeps the same reference, and therefore doesn't trigger rerenders
  const memCtx = useRef({ context, setContext });

  // This updates the ref with the latest context and setContext.
  // Without doing this, calling "setContext((context) => {...})"
  // in usePubSub would be referencing stale data.
  memCtx.current.context = context;
  memCtx.current.setContext = setContext;

  // This publishes the same state to each setState function/component. You 
  // could also have function(s) sending updates to only certain setState functions.
  const publish = state =>
    Object.values(memCtx.current.context.subscribers).forEach(fn => fn(state));

  memCtx.current.publish = publish;

  return <Context.Provider value={memCtx.current}>{children}</Context.Provider>;
};

```

Check out [this code sandbox](https://codesandbox.io/s/quirky-thunder-07z0d) to see `usePubSub` in use.

In the sandbox you'll see App and App2 - App2 does the same thing but without `usePubSub`. Check out the different in the Performance tab of React Profiler between the two.

## Words of Caution

A few things I want to point out before ending this post:

1. Context is not always the best solution for state management. I've found it works very well for individual "models", such as a single customer's data. But it doesn't work as well when storing several types of data in a single object. However there are certainly times where this needs to be done; which is a potential use case for something like `usePubSub`.

2. While putting `setState` functions in Context worked well for my use case, I have not seen this pattern elsewhere, so I can't necessarily say it's a good one, or the right one. But it did solve my specific problem and I have not seen any resulting bugs or errors in the console, eslint, or elsewhere.