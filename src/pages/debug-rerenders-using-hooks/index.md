---
title: "How to debug unnecessary rerenders using React Hooks"
date: "2019-08-10T12:20:50.028Z"
---

__UPDATE__: Since posting this article (literally 5 days after), React released new and improved performance tools. Check out my [revised post](/debug-react-rerenders).

When working with class components in React I frequently utilize the `shouldComponentUpdate` lifecycle method to debug unnecessary rerenders, which have been the root cause of most performance issues that I have come across.

But, in the world of Hooks we do not have access to `shouldComponentUpdate`. And with Hooks, I've found that unnecessary rerenders happen even more often -- so it's important to have good debugging tactics.

Fortunately, React v16.6.0 gave us a new `memo` method that can be used with functional components to give us more control over rerenders, just like we're used to with `shouldComponentUpdate`. Since `React.memo` wasn't part of the "Hooks release", you might not think to use it for debugging Hooks -- but it is the most effective tool I've found so far.

The key to debugging rerenders is to use the second optional argument of `React.memo` which is an "isEqual" function that takes two arguments, `prevProps` and `nextProps`, and gives you control over whether a component should change. See the [React docs](https://reactjs.org/docs/react-api.html#reactmemo) for `memo` for more details.

Now with access to `prevProps` and `nextProps`, you can easily view what is changing and determine the root cause of rerenders:

```js
const memoizedComponent = React.memo(MyComponent, 
  (prevProps, nextProps) => {

    console.log(prevProps.thing === nextProps.thing);

    /*
      When using this function you always need to return
      a Boolean. For now we'll say the props are NOT equal 
      which means the component should rerender.
    */
    return false;
  }
)
```

Side note: while you can use `React.memo` to manually prevent rerenders once you find the issue, I highly recommend dealing with the root cause -- which is more often than not a prop that is being unnecessarily recreated on every render. Otherwise you'll end up band-aiding every component with `React.memo` which will result in lots equality checks, plus data being stored in memory. 

### Profiler
Another helpful tool to debug rerenders is the [Profiler in DevTools](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html). This will give you a visual indication of _what_ is rerendering, but it is not as helpful in determining _why_ a rerender happens. 

Again, often the root cause is a prop reference that has changed, and `React.memo` is the only tool I've found that helps identify reference changes.

If you have other tools or tips for perf debugging with Hooks [let me know!](https://twitter.com/BryceDooley) 