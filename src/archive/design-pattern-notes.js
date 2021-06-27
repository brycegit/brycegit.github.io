/**
 * Design patterns
 *
 * Composite - treat both items and groups of items the same
 *
 * Strategy - externalize an algorithm so you can choose which to use at run time
 *
 * Decorator - add responsibilities to an existing object
 *
 * Abstract Factory - create products of a certain family based on a single variable
 *
 * Bridge - establish an interface between two classes so each can evolve independently
 *
 * Command - encapsulate a request by wrapping it in a uniform interface
 *
 * Iterator - enables access/traversal of an object without exposing the data structure
 *
 * Visitor - perform an action by providing any visitor object
 *
 * Builder - allows complex objects to be constructed in multiple steps
 *
 * Factory - encapsulates logic for creating different types of products
 *
 */

// composite

class Item {
  getPrice() {
    return 1
  }
}

class Items {
  constructor(items) {
    this._items = items
  }

  getPrice() {
    return this._items.reduce((total, item) => item.getPrice() + total, 0)
  }
}

const totalPrice = new Items([new Item(), new Item()]).getPrice() // 2

// strategy

class Cart {
  constructor({ calc, items }) {
    this._calc = calc
    this._items = items
  }

  getTotal() {
    const total = this._calc(this._items)

    return total
  }
}

new Cart({
  calc: items => items.reduce((acc, i) => acc + i),
  items: [1, 2],
}).getTotal() // 3

// decorator

function withDiscount(Item) {
  const orig = Item.prototype.getPrice

  Item.prototype.getPrice = function() {
    const price = orig.call(this)

    return price - 0.25
  }

  return Item
}

const DiscountItem = withDiscount(Item)

new DiscountItem().getPrice()
