---
title: 5 rules for better code
date: '2023-01-03T13:32:12.073Z'
---

In this article I'll outline 5 rules I try to follow to improve my code.

## 1. Use the same type for a function's argument(s) and return value

This ultimately makes it easier to compose your functions/logic. If for example you are adding a `truthyLength` property to an object, you may do something like this:

```js
const thing = {
  list: [null, 1, 2, 3],
  createdOn: '01-03-2023',
  rank: 2,
}

function getTruthyLength(list) {
  return list.filter(Boolean).length
}

thing.truthyLength = getTruthyLength(thing.list)
```

Later if you need to add more computed values to the object, you'd likely end up building more functions. For example:

```js
thing.createdOnDay = getDayFromMMDDYYYY(thing.createdOn)

thing.total = getTotalFromList(thing.list)
```

The problem with this is developers will need to inspect the input and output of every function when adding or modifying behavior. This can be daunting when an object is being modified by 20+ functions (I've seen it happen 😀)

Alternatively you can keep the arguments and return type consistent.

```js
const thing = {
  list: [null, 1, 2, 3],
  createdOn: '01-03-2023',
  rank: 2,
}

// every function accepts and returns the "thing" interface
function getTruthyLength(thing) {
  const truthyLength = thing.list.filter(Boolean).length

  return { ...thing, truthyLength }
}

const thingWithTruthyLength = getTruthyLength(thing)

const thingWithDay = getDayFromMMDDYYYY(thingWithTruthyLength)

const thingWithTotal = getTotalFromList(thingWithDay)
```

This makes composition much easier as more functions are added. It also opens the door to using functional programming methods like `compose`.

```js
const R = require('ramda')

const enrichedThing = R.compose(
  getTruthyLength,
  getDayFromMMDDYYYY,
  getTotalFromList
)(thing)
```

Note: this does require functions to be dependant on a particular interface, and if the function was used in a variety of places that may not make sense. But if the function is always used with a single interface it can work well.

## 2. Use intention revealing interfaces

This mostly pertains to object oriented programming, although it can also be beneficial when designing function APIs.

An interface is an ideal place to communicate to other developers what an object and/or function does, and doesn't do.

For example, the intent for the below `Person` class is for developers to instantiate a `person`, and access `person.name`. However this convoluted interface doesn't clearly express that intent, and might lead developers to use the `formatName` or `validateName` methods, making it more difficult to change them later on:

```js
class Person {
  constructor(name) {
    if (!this.validateName(name)) {
      this._name === 'N/A'
    } else {
      this._name = name
    }
  }

  get name() {
    return this.formatName(this._name)
  }

  formatName(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .join(' ')
  }

  validateName(name) {
    return typeof name === 'string'
  }
}
```

Alternatively we can restrict the interface to only include the properties/methods that we want developers to use:

```js
class Person {
  constructor(name) {
    if (!validateName(name)) {
      this._name === 'N/A'
    } else {
      this._name = name
    }
  }

  get name() {
    return formatName(this._name)
  }
}

function formatName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .join(' ')
}

function validateName(name) {
  return typeof name === 'string'
}
```

Domain Driven Design is a great book that talks about intention revealing interfaces in more detail.

## 3. Avoid unnecessary mutations

I've seen way to many hard to find bugs caused by small mutations happening in nested code. A simple example:

```js
const thing = {
  name: 'Thing',
  address: 'A Street',
}

function getAddressOnly(thing) {
  delete thing.address
  return thing
}

const address = getAddressOnly(thing)

// name is no longer available
const name = getNameOnly(thing)
```

Even if it seems the mutation won't have an effect elsewhere, it's best to avoid them whenever possible (libraries like `immutable-js` can help with that).

This version avoid a mutation while retaining the functionality:

```js
const thing = {
  name: 'Thing',
  address: 'A Street',
}

function getAddressOnly(thing) {
  return { address: thing.address }
}

const address = getAddressOnly(thing)

// name is still available
const name = getNameOnly(thing)
```

## 4. Use the facade pattern for third party libraries

There is no doubt third party libraries are an efficient way to add functionality to software. But it comes at a cost; if the library changes or needs to be removed/replaced, it can be time consuming to get that done.

It is especially difficult when a library is pulled into multiple files; replacing the library would mean updating every single file where it is used.

```js
// user.js
import { format } from 'date-fns'

user.createdOn = format(new Date(), 'MM/dd/yyyy')

// order.js
import { format } from 'date-fns'

order.createdOn = format(new Date(), 'MM/dd/yyyy')
```

Instead you can create a new "module" for date-fns and restrict the import to a single file. This also gives you the opportunity to restrict the functionality (the date format) which will drive consistency:

```js
// date-utils.js
import { format } from 'date-fns'

export function formatMMDDYYYY(date) {
  return format(date, 'MM/dd/yyyy')
}

// user.js
import { formatMMDDYYYY } from '../date-utils'

user.createdOn = formatMMDDYYYY(new Date())

// order.js
import { formatMMDDYYYY } from '../date-utils'

order.createdOn = formatMMDDYYYY(new Date())
```

Now if you need to update the library, we just need to keep the interface intact.

## 5. Limit if statements

`if` statements are one of the most commonly used constructs in programming. They are also a very common source of logic-related issues.

Every time I use an `if` statement in my code, I challenge myself to go back and change it. For example:

```js
const audio = { type: getType() }

function yell() {
  console.log('HELLOOO!!')
}
function talk() {
  console.log('hello')
}

const isMicOn = getIsMicOn()
const isAcousticShow = getIsAcousticShow()

if ((audio.type === 'yell' && isMicOn) || isAcousticShow) yell()
if (audio.type === 'talk' && isMicOn) talk()
```

There is a bug in the above code where `yell()` _will_ be called if `audio.type` does _not_ equal `'yell'`, but `isAcousticShow` is `true`. It also doesn't make it explicit what happens when a match isn't found.

Here is another approach that avoids `if` statements:

```js
const audio = { type: getType() }

function getAudio({ type, isMicOn, isAcousticShow }) {
  const micStatus = isMicOn ? 'micOn' : 'micOff'
  const acousticStatus = isAcousticShow ? 'acousticOn' : 'acousticOff'

  const audioMap = {
    yell: {
      isMicOn: {
        acousticOn() {console.warn('Mic should be turned off for an acoustic show!')}
        acousticOff() {console.log('HELLOOO!!')}
      },
      isMicOff: {
        acousticOn() {console.log('HELLOOO!!')}
        acousticOff() {console.log('Mic should be turned on!')}
      }
    },
    talk: {
      isMicOn: {
        acousticOn() {console.warn('Mic should be turned off for an acoustic show!')}
        acousticOff() {console.log('hello')}
      },
      isMicOff: {
        acousticOn() {
          // do nothing...talking is too quite during an acoustic show!
        }
        acousticOff() {console.log('Mic should be turned on!')}
      }
    }
  }

  return audioMap[type][micStatus][acousticStatus]
}

const isMicOn = getIsMicOn()
const isAcousticShow = getIsAcousticShow();

const audio = getAudio({ type: audio.type, isMicOn, isAcousticShow })

audio()
```

This is a lot more code, but it forces us to think through all the edge cases and make explicit decisions.

Side note: if the mapping object is getting large it might be worth using a state machine/statechart tool to help.
