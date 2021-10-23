import { atom, selector } from 'recoil';

export const cartState = atom({
  key: 'cart',
  // each item in list has 3 keys: id, product and quantity
  default: JSON.parse(localStorage.getItem("cart")) || []
});

export const cartTotalPrice = selector({
  key: 'cartTotalPrice',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((totalPrice, item) => {
      return totalPrice + ((item.product.price - item.product.discount) * item.quantity);
    }, 0);
  }
});

export const cartTotalQuantity = selector({
  key: 'cartTotalQuantity',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((totalQuantity, item) => {
      return totalQuantity + item.quantity;
    }, 0)
  }
});

export const addToCart = (cart, product, quantity = 1, uid) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.product.id === product.id && x.product.size === product.size && x.product.color === product.color);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + quantity,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    product,
    id: uid,
    quantity: quantity,
  });
  return newCart;
};

export const removeFromCart = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (foundIndex >= 0) {
    newCart.splice(foundIndex, 1);
    return newCart;
  }
}

export const decreaseCartItem = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity - 1,
    };
    return newCart;
  }

  console.log('something went wrong');
  return cart;
}

export const increaseCartItem = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + 1,
    };
    return newCart;
  }

  console.log('something went wrong');
  return cart;
}

export const getProductQuantityInCart = (cart, productId) => {
  const indexes = cart.reduce((totalIndexes, cartItem, i) => cartItem.product._id === productId ? totalIndexes.concat(i) : totalIndexes, []);
  return indexes.reduce((totalQuantity, index) => totalQuantity + cart[index].quantity, 0);
}
