import Cart from '../services/cart.service.js';

const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, colorLink, size, quantity } = req.body;
    const rowProduct = await Cart.getQuantityProduct(productId);
    if (rowProduct[0].quantity < quantity) {
      return res.status(500).json({ message: 'Not enough product' });
    }

    const rowCart = await Cart.getCart(userId);
    let newCart = null;
    let oldCart = null;

    if (rowCart.length === 0) {
      newCart = await Cart.add(userId);
      await Cart.addCartDetail([newCart?.insertId, productId, colorLink, size, quantity]);
    } else {
      oldCart = await Cart.getCart(userId);
      await Cart.addCartDetail([oldCart[0]?.id, productId, colorLink, size, quantity]);
    }

    return res.status(201).json({ message: 'Add category success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProductsInCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Cart.getAllProducts(userId);

    return res.status(200).json({ products: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateQuantityProduct = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.params.id;
    const rowProduct = await Cart.getQuantityProduct(productId);
    if (rowProduct[0].quantity < quantity) {
      return res.status(500).json({ message: 'Not enough product' });
    }

    const rowCart = await Cart.getCart(userId);
    if (rowCart.length === 0) {
      return res.status(404).json({ message: 'Error update cart' });
    } else {
      await Cart.updateQuantityProduct([quantity, rowCart[0].id, productId, size]);
    }

    return res.status(200).json({ message: 'Update cart success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.params.id;

    const rowCart = await Cart.getCart(userId);
    if (rowCart.length === 0) {
      return res.status(404).json({ message: 'Error delete cart' });
    } else {
      if (products.length === 1) {
        await Cart.deleteProductInCart([rowCart[0].id, products[0].productId, products[0].size]);
      } else {
        for (let i = 0; i < products.length; i++) {
          await Cart.deleteProductInCart([rowCart[0].id, products[i].productId, products[i].size]);
        }
      }
    }

    return res.status(200).json({ message: 'Delete cart success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addProductToCart,
  getAllProductsInCart,
  updateQuantityProduct,
  deleteProductInCart,
};
