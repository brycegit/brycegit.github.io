---
title: "Refactoring: My 6 favorite patterns"
date: "2020-03-04T13:55:09.293Z"
---

Refactoring code has become one of my favorite things to do as a developer. It can have a major impact on code cleanliness, readability, and maintainability. 


In this post I’ll outline 6 refactoring patterns that I've found to be very useful and provide examples of each. Many are inspired by Martin Fowler's “Refactoring” book, which I highly recommend if you're looking to better understand common refactoring patterns.


(Side note: having good test coverage is also a _CRUCIAL_ part of refactoring, but is outside the scope of this post.) 


While the examples are in JavaScript, each pattern should be applicable to any programming language.


## 6. Introduce Object Parameter


When functions have multiple parameters, you start running into a few issues:
1. For the function to work correctly, the order of parameters needs to be maintained.
1. The names of the _arguments_ (the actual values) passed to a function might not necessarily be the same as the parameter names, which makes searching for certain types of data/logic hard to do.
1. Adding/removing parameters is a chore; each use of the function needs to be examined.


To make function parameters more manageable, this pattern involves converting a list of parameters into a single object. This forces consistent parameter naming across all functions, and makes the parameter order insignificant. 

```js
// Before

function sayHello(toName, punctuation, fromName) {
  return `Hello, ${toName}${punctuation} From, ${fromName}.`
} 

sayHello(customerName, end, myName);

// After

function sayHello({ toName, punctuation, fromName }) {
  return `Hello, ${toName}${punctuation} From, ${fromName}.`
} 

sayHello({ toName, punctuation, fromName });
```


## 5. Replace Anonymous Function with Expression


In JavaScript it’s a common practice to pass an anonymous function into an array method, such as `.map`, `.reduce`, or `.filter`. One issue I frequently see with these anonymous functions is they become complicated and difficult to parse; and since there is no name for the function it can be difficult to quickly understand the intent of the code.


Instead, I’ve found it helpful to extract these anonymous functions into a function expression, which makes it much easier to understand the intent (this also resembles "point-free style" a.k.a. "tacit programming".).

```js
// Before

const activeUsers = users.filter((user) => {
  if(user.lastPayment >= moment().startOf('week').toDate()) {
    return true;
  }

  return false;
});

// After

const activeUsers = users.filter(hasUserPaidThisWeek);

function hasUserPaidThisWeek(user) {
  if(user.lastPayment > moment().startOf('week').toDate() ) {
    return true;
  }

  return false;
}
```


## 4. Replace Primitive with Object


Using a primitive value such as a string, number, or boolean is a common practice in many programming languages. But problems can arise when requirements and/or rules around these primitive values become more complex. 


Instead of using an uncontrolled primitive value, a helpful practice is to wrap these primitives in an object, which will give you more control over how the value is consumed and modified. 

```js
// Before

let isLoading = true;
// some code...
loading = false;

const phone = '1 617 484-4049';

const price = 11;

// After

class LoadingStatus {
  constructor(initialStatus) {
    if(!this.statusSet.has(initialStatus)) {
      throw new Error('Invalid status');
    } 

    this._status = initialStatus;
  }

  statusSet = new Set(['loading', 'success', 'error', 'idle'])

  get status() {
    return this._status;
  }

  set status(status) {
    if(!this.statusSet.has(status)) {
      throw new Error('Invalid status');
    } 

    this._status = status;
  }
}

class Phone {
  constructor(phone) {
    this._phone = this.parsePhone(phone);
  }

  parsePhone(phone) {
    const trimmedPhone = phone.trim();

    if(phone.length !== 10) {
      throw new Error('Invalid phone format');
    }

    const areaCode = trimmedPhone.slice(0,3);
    const prefix = trimmedPhone.slice(3,7);
    const lineNumber = trimmedPhone.slice(7, 10);

    return { areaCode, prefix, lineNumber };
  }

  get areaCode() {
    return this._phone.areaCode;
  }

  get formatted() {
    const { areaCode, prefix, lineNumber } = this._phone;

    return `${areaCode} ${prefix}-${lineNumber}` 
  }

  ...
}

class Price {
  constructor(price) {
    if(typeof price !== 'string') {
      throw new Error('Invalid price');
    }

    if(!(price).match(/^[0-9]*$/)) {
      throw new Error('Invalid price');
    }

    this._price = price;
  }

  get price() {
    this._price;
  }
}
```


## 3. Decompose Conditional


`if/else` statements can be a powerful tool when adding logic to your program. But they can also become unwieldy and confusing very quickly. One way to counteract this is by making the conditional logic easier to understand by extracting it into expressions that describe your intent.

```js
// Before

if(user.hasEmail() && user.subscriptions.includes('email')) {
  sendEmail(user);
}

// After

const isSubscribed = user.hasEmail() && user.subscriptions.includes('email');

if(isSubscribed) {
  sendEmail(user);
}
```


## 2. Encapsulate Record (Bridge Pattern)


Most of the time building software involves consuming an existing API and/or providing your own. If your component is coupled with another API and that API changes, you may need to change your component as well; and this can sometimes be very time consuming.


Instead of coupling various APIs, I find it helpful to give each component an API that makes the most sense given its functionality, and adding a layer in between your component and any other API it is interacting with. 


The Encapsulate Record refactoring pattern provides a great way to do this. This idea is also aligned with the Bridge pattern, which you can learn more about in "Design Patterns: Elements of Reusable Object-Oriented Software”.

```js
// Before

const user = {
  name: 'A Name', 
  favorites: { 
    color: 'blue',
    food: 'pizza'
  }
}

const UserComponent = (user) => (
  <div>Name: {user.name} - Food: {user.favorites.food}</div>
);

UserComponent(user);

// After

const user = {
  name: 'A Name', 
  favorites: { 
    color: 'blue',
    food: 'pizza'
  }
}

class User {
  constructor(user) {
    this._user = user;
  }

  get name() {
    return this._user.name;
  }

  get food() {
    return this._user.favorites.food;
  }
}

const UserComponent = ({ name, food }) => (
  <div>Name: {name} - Food: {food}</div>
);

UserComponent(new User(user));

```


## 1. Replace Conditional with Polymorphism

This is probably my favorite refactoring pattern. Several times it has helped me make confusing conditional logic much more readable and maintainable. And once logic is encapsulated in an object, you then have the flexibility to utilize other OOP design patterns to help achieve your goals.

The idea here is that instead of using a bunch of nested `if` statements in your code, you create objects that represent different "types", and give each type method(s) that are in charge of performing certain actions. Then, the application can simply call the same method on each type, and it’s up to the type to perform the action in the correct way.

```js
// Before

if(user.favorites.food === 'pizza') {
  sendPizzaEmail(user);
}

if(user.favorites.food === 'ice cream') {
  sendIceCreamEmail(user);
}

// After

class PizzaUser {
  constructor(user) {
    this._user = user;
  }

  sendEmail() {
    sendPizzaEmail(this._user);
  }
}

class IceCreamUser {
  constructor(user) {
    this._user = user;
  }

  sendEmail() {
    sendIceCreamEmail(this._user);
  }
}

// this would create the appropriate user using the above classes
const user = getUser(userData); 

user.sendEmail()
```

That's it! Happy refactoring!