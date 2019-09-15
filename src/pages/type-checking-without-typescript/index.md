---
title: Type checking JavaScript in VSCode without TypeScript
date: "2019-09-14T17:40:29.095Z"
---

TypeScript offers amazing benefits, but at the cost of requiring additional compilation steps, and learning a new syntax. 

Thankfully, VSCode gives you the ability to add type checking without needing to bring TypeScript into your project. Instead it utilizes something that you may already be using in your codebase -- [JSDoc](https://jsdoc.app/index.html)!

First, you'll need to add this snippet into your VSCode settings:
`"javascript.implicitProjectConfig.checkJs": true`

Now, if you add JSDoc strings to any of your code, VSCode will use the type definitions to verify you are using the correct types, and if not display helpful error messages.

## Type checking params
Here is a basic example of using a JSDoc definition for function params:

```js
/**
 * @param {Number} a 
 * @param {Number} b 
 */
function add(a, b) {
  return a + b;
}
```

If we try to running the following function we will get an error message from VSCode:

```js
add(1, '2');
// Argument of type '"2"' is not assignable to parameter of type 'number'.
```

## Creating reusable types
One useful tool is JSDoc's `@typedef` which allows you to create reusable types that can be used across your codebase. Here is a simple example:

```js
/**
 * @typedef {Number[]} NumberArray
 */

/**
 * @param {NumberArray} list 
 */
function addList(list) {
  return list.reduce((total, num) => total + num)
}

addList('a');
// Argument of type '"a"' is not assignable to parameter of type 'number[]'.
addList([1, 'a']);
// Type 'string' is not assignable to type 'number'.
```

While this doesn't give you the full power of TypeScript, it does enable you to use one of its most useful features. Check out the [JSDoc](https://jsdoc.app/index.html) documentation for more examples of type definitions. 

If you have other ideas or thoughts [let me know!](https://twitter.com/BryceDooley)

