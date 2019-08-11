---
title: A quick overview of ES2019
date: "2019-08-03T16:23:15.075Z"
---

ES2019 gives us several new features. Here I’ll provide an overview of the major ones -- along with any gotchas to be aware of -- and provide links to the additional minor updates. 

Each of these features are available to use in v8 v7.3 & Chrome 73. Be sure to check for the support of these features when using them elsewhere.

## Array.prototype.flat()

By default it will flatten one level
```js
[1, 2, [3, 4]].flat(); 
// [1, 2, 3, 4]

[1, 2, [3, [4, 5]]].flat();
//  [1, 2, 3, [4, 5]]
```

You can adjust the number of levels to flatten
```js
[1, 2, [3, [4, 5]]].flat(2);
// [1, 2, 3, 4, 5]
```

### Gotchas

A missing item will result in `undefined`, if it is nested
```js
[1, 2, [3, [4,[, 6]]]].flat(2);
// [1, 2, 3, 4, [undefined, 6]]
```

A missing item will be removed, if it is not nested
```js
[1, 2, [3, [4,[, 6]]]].flat(3);
// [1, 2, 3, 4, 6]
```

## Array.prototype.flatMap()

The value returned by the callback will be flattened one level, if it's an array
```js
[1, 2, 3, 4].flatMap((n) => [n]);
// [1, 2, 3, 4]

[1, 2, 3, 4, 5].flatMap((n) => [[n]]);
// [[1], [2], [3], [4], [5]]
```

Otherwise it returns the value as is
```js
[1, 2, 3, 4].flatMap((n) => n);
// [1, 2, 3, 4]

[[1], 2, [3], 4].flatMap((n) => n);
// [1, 2, 3, 4]
```

It is extremely useful if you need to filter and map values
```js
[1, 2, 3, 4, 5].flatMap(
  (a) => a % 2 ? a + " is odd" : []
);
// ["1 is odd", "3 is odd", "5 is odd”]
```

### Gotchas

If the a second argument is provided it becomes `this`
```js
var stuff = 'stuff';

[1, 2, 3, 4, 5].flatMap(
  function(n) { 
    return `${this.stuff} ${n}`;
  },
  { stuff: 'thing' }
);
// ["thing 1", "thing 2", "thing 3", "thing 4", "thing 5"]
```

## Object.fromEntries()

Creates an object from any iterable containing `[key, value]` tuples (Map, Array or custom iterable)
```js
Object.fromEntries([['one', 1], ['two', 2], ['three', 3]]);
// { one: 1, three: 3, two: 2 }

Object.fromEntries(new Map([['one', 1]]));
// { one: 1 }

Object.fromEntries(Object.entries({ one: 1 }));
// { one: 1 }
```

### Gotchas
Will throw an error if used with a Set
```js
Object.fromEntries(new Set(["1"]));
// TypeError: Iterator value one is not an entry object
```

## String.prototype.{trimStart, trimEnd}
```js
'  hello world  '.trimStart();
// “hello world  “

'  hello world  '.trimEnd();
// “  hello world”

'  hello world  '.trimStart().trimEnd();
// “hello world”
```

### Gotchas
trimLeft & trimRight are now aliases to trimStart & trimEnd, respectively

## Optional catch binding 

Catch no longer requires an error parameter, i.e. `catch(error) {...}`
```js
let catchResult = 'uncaught';
try {
  throw new Error();
} catch {
  catchResult = 'caught';
}
console.log(catchResult); 
// “caught”
```

### Gotchas
`catch()` is still not allowed; if `()` is present it must have a parameter
```js
try {
  throw new Error();
} catch() {
  catchResult = 'caught';
} 
// SyntaxError: Unexpected token !
```

## Other ES2019 changes
The remaining changes are either internal or don't have many use cases, but are still useful to know about...

Symbol.prototype.description 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description

Stable Array.prototype.sort() 
https://mathiasbynens.be/demo/sort-stability

Well-formed JSON.stringify()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Well-formed_JSON.stringify()

JSON superset
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#JavaScript_and_JSON_differences (see "Any JSON text is a valid JavaScript expression”)

Revised/standardized Function.prototype.toString()
https://tc39.es/Function-prototype-toString-revision/#sec-introduction