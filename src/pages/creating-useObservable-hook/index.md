---
title: Creating a useObservable React Hook
date: "2019-08-26T00:51:14.436Z"
---

Here we'll take a look at how to create your own `useObservable` Hook in React, utilizing RxJs Observables, allowing you to easily share Observables across your app.

## But, why?

There are many use cases for Observables within web apps, and exposing them via a custom Hooks is a great way to bring Observables into a React app.

If you aren't familiar with Observables, you can basically think of them as a way to react to a series of events (either sync or async) in an easy and declarative way. Almost like combining a Promise and an Iterator.

An example use case would be if you were making a [Frogger](https://en.wikipedia.org/wiki/Frogger)-like game you would have "jump" events and "vehicle movement" events. Using an Observable would let you track both events, do something when when the poor frog jumped into a car, and then turn off tracking of events.

Here I'll be using the RxJs Observable library. [Check out the docs ](https://rxjs-dev.firebaseapp.com/) to learn more about Observables. 

## The App

The purpose of this app is just to show how `useObservable` is created and used, not an actual use case for Observables (that would require a much longer article). Here it is:

```js
// index.jsx

import React, { useState, useEffect } from "react";
import { useObservable } from "../custom-hooks";

function App() {
  // The observable will be used to set local state, so we also
  // need to use useState.
  const [appState, setAppState] = useState({ on: false });
  // We'll initialize the observable with appState. All subscribers 
  // will have this same initial state.
  const [observable, setObservableState] = useObservable(appState);

  useEffect(() => {
    const myObservable = observable.pipe(
      // Here is where we'd add RxJs operators to make magic happen.
      // https://rxjs-dev.firebaseapp.com/guide/operators
    )

    myObservable.subscribe({
      next: v => {
        setAppState(v);
      }
    });

    // When the component unmounts we'll unsubscribe from events
    return observable.unsubscribe;
  }, [observable])

  return (
    <div className="App">
       { /* setObservableState() will broadcast changes to all subscribed components */ }
      <button onClick={() => setObservableState({ ...appState, on: true })}>
        Turn On
      </button>
      <button onClick={() => setObservableState({ ...appState, on: false })}>
        Turn Off
      </button>
    </div>
  );
}

```

## The Hook

```js
// custom-hooks.jsx

import React from "react";
// A Subject is a special type of Observable that can 
// act as both an observer and observable. In other words it 
// can both receive messages AND broadcast changes.
// A BehaviorSubject is a type of Subject that let's you 
// set an initial value. Check out RxJs docs for more info.
import { BehaviorSubject as Observable } from "rxjs";

let observable;
let handleNext;

export const useObservable = (initialState = {}) => {
  if (!observable) {
    observable = new Observable(initialState);

    handleNext = value => {
      observable.next(value);
    };
  }

  return [observable, handleNext];
};
```


## 

That's it! If you have other thoughts or feedback [let me know!](https://twitter.com/BryceDooley)