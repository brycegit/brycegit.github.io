---
title: Mocking async React Redux components using Jest
date: "2019-08-18T17:35:17.024Z" 
---

In this article I'll outline an approach that has worked well for me when testing React component logic that is tied to async Redux actions.

An example of this would be a `<Search />` component that calls a search service and displays results. I'll use this example in the code below.

## The Problem
When functionality of React components is tied to Redux actions/reducers and api calls, they become a bit harder to test than a standalone component. Ideally you want to test the integration of the component, the Redux ecosystem and the asynchronous api calls (this most closely resembles the end user's experience). But unless you have a working api some mocking will need to happen.

## The Solution
As I'll explain below, one solution I've found to work well is mocking the Redux actions that trigger async api calls. This allows you to test the interface of the React component without needing an actual api to return results.

## The Test

Here is a basic example of what a `<Search />` test might look like:

```js
// search-test.js

import setup from './setup';

test('should send correct search params to api on submit', () => {
  const { submitButton, params, actions } = setup();

  // Let's assume the search form already 
  // has the search values in place.
  fireEvent.click(submitButton);

  expect(actions.search).toHaveBeenCalledWith(params);
})
```

## The Setup

This file allows you to export the rendered `<Search />` component integrated with a Redux store, along with mocked Redux actions. While this could live in the test file, I prefer to keep them separate for greater reusability. 

Your actual setup may need to change based on your test lib; I had [React Testing Library](https://github.com/testing-library/react-testing-library) in mind when writing this.

```js
// setup.js

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import render from 'your-testing-lib';
import actions from '../search/actions';
import reducer from '../search/reducer';
import Search from '../search/component';

jest.mock('../search/actions', () => {
  return {
    search: jest.fn(() => {
      // It is common for an action to return a higher order 
      // function that exposes "dispatch", especially when
      // using redux-thunk. To keep the tests synchronous
      // we'll just return an object.
      return {
        // Note: the type string must be entered
        // manually vs importing a constant, due
        // to jest.mock being hoisted
        type: 'SUBMIT_SEARCH',
        payload: { ...somePayload }
      }
    })
  };
})

export default function setup({
  initialState = { ...someInitialState }
} = {}) {
  const testingLibFns = render(
    <Provider store={createStore(reducer, initialState)}>
      <Search />
    </Provider>
  );

  return {
    ...testingLibFns,
    params: { ...someSearchParams },
    submitButton: testingLibFns.getByText('Submit'),
    actions
  }; 
}
```

This setup will allow you to test your component and a portion of the Redux integration, without needing to deal with a real api or async code. If you have other ideas or thoughts [let me know!](https://twitter.com/BryceDooley)