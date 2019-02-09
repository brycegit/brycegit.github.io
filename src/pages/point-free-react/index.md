---
title: The benefits of pointless React code
date: "2019-01-18T14:21:08.361Z"
---

Okay this title is a play on words — I am definitely not advocating for writing code that has no purpose. Rather, pointless in this sense refers to point-free coding style.

Point-free style (a.k.a. [tacit programming](https://en.wikipedia.org/wiki/Tacit_programming)) is a functional programming concept, which basically means composing functions without exposing arguments. Here is a simple example:

```javascript
const addExclamationPoint = (word) => word + '!';

// This is NOT point-free because the argument (word) IS exposed

['Woo', 'Woo'].map(
  (word) => addExclamationPoint(word)
); 
// ["Woo!", "Woo!"]


// This IS point-free because the arguments is NOT exposed

['Woo', 'Woo'].map(addExclamationPoint); 
// ["Woo!", "Woo!"]
```

Now this may not seem like an extremely valuable concept up front, but let me show you how it can be used to write cleaner and more composable functions within React components.

## Starting with a basic React component
To start, let’s say we have the following component, which is responsible for displaying data related to an e-commerce order.

```javascript
class OrderDetailsContainer extends React.Component {

  getOrderDetails(items, userInfo, coupons) {
    const subTotal = this.calculateTotalWithTax(userInfo, items, coupons);

    const totalAfterDiscount = this.calculateTotalAfterDiscount(subTotal, userInfo);

    const shippingTime = this.getShippingTime(userInfo, totalAfterDiscount);

    return {
      shippingTime,
      totalCost: totalAfterDiscount
    }
  }

  calculateTotalWithTax = (userInfo, items, coupons) => {
    const totalPreTax = items.reduce((acc, item) => {
      return acc += item.cost;
    }, 0);

    const couponDeduction = coupons.reduce((acc, coupon) => {
      return acc += coupon.amount;
    });

    const stateTaxPercent = userInfo.stateTaxPercent;

    return (totalPreTax - couponDeduction) * stateTaxPercent;
  }

  calculateTotalAfterDiscount = (subTotal, userInfo) => {
    if(userInfo.goldMember) {
      return subTotal - (subTotal * goldMember.discount);
    } else {
      return subTotal;
    }
  }

  getShippingTime = (userInfo, totalCost) => {
    return utils.calculateShippingTime(userInfo.zipCode, totalCost);
  }

  render() {
    const { items, userInfo, coupons } = this.props;
    const orderDetails = this.getOrderDetails(items, userInfo, coupons);

    return <OrderDetailsView {...orderDetails} />
  }
}
```
This component is fairly straight-forward -- it is responsible for passing two prop s (`shippingTime` and `totalCost`) to `<OrderDetailsView />`. To do that it uses three methods: `calculateTotalWithTax`, `calculateTotalAfterDiscount` and `getShippingTime`. 

This is not a bad start at all — the methods are pure (given an input they will always return the same output), and therefore are easier to compose, and test, than functions with side effects.

While this certainly gets the job done, I would argue that refactoring this to use point-free style will make it not only much more readable, but also much easier to adjust, and reuse, pieces of functionality.

## Pipe and Compose

Another concept I’ll cover briefly is pipe and compose. If you’ve using functional libraries like Ramda or Lodash, you’re likely familiar with these. But if not, they are essentially helper functions that allow you to combine a series of functions, where one function’s output will because the input to the next function. 

Pipe will go through this process left-to-right (like sending something down a pipe), and compose right-to-left (as if you were nesting functions). 

Pipe and compose unlock the secret powers of point-free functions. In this example I’ll be using pipe.

## Refactor to Use Point-free Style

The first step I’d take in the refactor is adjusting OrderDetailsContainer's methods so that they all have the same input and output. This is will allow for much easier composition, since you don’t have to think about what each function is passing to the next. I'll change the current input/output to an `orderData` object.

```javascript
class OrderDetailsContainer extends React.Component {

  getOrderDetails(orderData) {
    const { userInfo, items, coupons } = orderData;

    const subTotal = this.calculateTotalWithTax(userInfo, items, coupons);

    const totalCost = this.calculateTotalAfterDiscount(subTotal, userInfo);

    const shippingTime = this.getShippingTime(userInfo, totalCost);

    return {
      ...orderData,
      shippingTime,
      totalCost
    }
  }

  calculateTotalWithTax = (orderData) => {
    const { items, coupons, userInfo } = orderData;

    const totalPreTax = items.reduce((acc, item) => {
      return acc += item.cost;
    }, 0);

    const couponDeduction = coupons.reduce((acc, coupon) => {
      return acc += coupon.amount;
    });

    const stateTaxPercent = userInfo.stateTaxPercent;

    const total = (totalPreTax - couponDeduction) * stateTaxPercent;

    return { ...orderData, total };
  }

  calculateTotalAfterDiscount = (orderData) => {
    const { userInfo, total } = orderData; 

    let newTotal;

    if(userInfo.goldMember) {
      newTotal = total - (total * goldMember.discount);
    } else {
      newTotal = total;
    }

    return { ...orderData, total: newTotal };
  }

  getShippingTime = (orderData) => {
    const {userInfo, total } = orderData;

    const shippingTime = utils.calculateShippingTime(userInfo.zipCode, total);

    return { ...orderData, shippingTime };
  }

  render() {
    const { items, userInfo, coupons } = this.props;

    const orderData = { items, userInfo, coupons, total: 0, shippingTime: 0 };

    const orderDetails = this.getOrderDetails(orderData);

    return <OrderDetailsView {...orderDetails} />
  }
}
```

Next, I’ll put these into a pipe function. You can get a pipe function from several functional libraries, but it’s actually pretty easy to write yourself:

```javascript
const pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
```

Now here’s the fun part — since I know what the input and output of each function is I can remove the arguments! To me, the intent of `getOrderDetails` is much more clear without argument names getting in the way.

Now that we have our composed function we can pass it inputs as needed:

```javascript
class OrderDetailsContainer extends React.Component {

  getOrderDetails(orderData) {
    return utils.pipe(
      this.calculateTotalWithTax,
      this.calculateTotalAfterDiscount,
      this.getShippingTime)(orderData);
  }

  calculateTotalWithTax = (orderData) => {
    const { items, coupons, userInfo } = orderData;

    const totalPreTax = items.reduce((acc, item) => {
      return acc += item.cost;
    }, 0);

    const couponDeduction = coupons.reduce((acc, coupon) => {
      return acc += coupon.amount;
    });

    const stateTaxPercent = userInfo.stateTaxPercent;

    const total = (totalPreTax - couponDeduction) * stateTaxPercent;

    return { ...orderData, total };
  }

  calculateTotalAfterDiscount = (orderData) => {
    const { userInfo, total } = orderData; 

    let newTotal;

    if(userInfo.goldMember) {
      newTotal = total - (total * goldMember.discount);
    } else {
      newTotal = total;
    }

    return { ...orderData, total: newTotal };
  }

  getShippingTime = (orderData) => {
    const {userInfo, total } = orderData;

    const shippingTime = utils.calculateShippingTime(userInfo.zipCode, total);

    return { ...orderData, shippingTime };
  }

  render() {
    const { items, userInfo, coupons } = this.props;

    const orderData = { items, userInfo, coupons, total: 0, shippingTime: 0 };

    const orderDetails = this.getOrderDetails(orderData);

    return <OrderDetailsView {...orderDetails} />
  }
}
```

I would probably then take it one step further and move the methods being used in `pipe` to a separate `order-utils.js` file to make this component even cleaner. Check it out:

```javascript
import { 
  calculateTotalWithTax, 
  calculateTotalAfterDiscount, 
  getShippingTime } from './order-utils';

class OrderDetailsContainer extends React.Component {

  getOrderDetails(orderData) {
    return utils.pipe(
      calculateTotalWithTax,
      calculateTotalAfterDiscount,
      getShippingTime)(orderData);
  }

  render() {
    const { items, userInfo, coupons } = this.props;

    const orderData = { items, userInfo, coupons, total: 0, shippingTime: 0 };

    const orderDetails = this.getOrderDetails(orderData);

    return <OrderDetailsView {...orderDetails} />
  }
}
```

Well that was fun — we are at the same place we were before, albeit with slightly more readable code. But the fun is not over… 

## Composition Super Powers

Let’s say we want to create a new function that does all of the same stuff, but also edits the error messages. If we had to make that change to the original version of the code, it might take some time to determine the best place to put that logic. 

But with our new composed function, we basically have a set of building blocks that we can add and remove as needed (a familiar concept to React developers for sure). So adding a function that edits errors messages is as easy as following the same input/output structure, and plugging it into the pipe.

```javascript
  // shippingCosts = (items, userInfo) => {

  // }


  // validateCoupons = (items, coupons) => {

  // }
 
    // const shippingCosts = this.shippingCosts(items, userInfo);
    // const validateCoupons = this.validateCoupons(items, coupons, total);
```

Lastly, because the intent of <function name> is clear at a quick glance, there is no need to keep all of the functions in the same file — instead we can move these to a utils file and really clean up our component code.

I hope this will inspire you to use point-free coding style to write cleaner, more composable code in your applications. Thanks for reading.

P.S. Here are some fantastic free resources for learning more about functional programming in javascript:

func lite, frisbee, egghead, mkb?







