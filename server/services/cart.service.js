//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Cart = {
  add: async (userId) => {
    const data = await executeQuery('INSERT INTO Cart (userId) VALUES (?)', [userId]);
    return data;
  },

  getCart: async (userId) => {
    const data = await executeQuery('SELECT id FROM Cart WHERE userId=?', [userId]);
    return data;
  },

  getProductInCart: async (infoProduct) => {
    const data = await executeQuery(
      `
    SELECT productId,quantity FROM CartDetail 
    WHERE productId=? 
    AND size=?
    AND colorLink=?`,
      infoProduct
    );
    return data;
  },

  getCartTrans: async (userId, pool) => {
    return await pool.query('SELECT id FROM Cart WHERE userId=?', [userId]);
  },

  addCartDetail: async (dataCartDetail) => {
    const data = await executeQuery(
      'INSERT INTO CartDetail (cartId,productId,colorLink,size, quantity) VALUES (?,?,?,?,?)',
      dataCartDetail
    );
    return data;
  },

  getQuantityProduct: async (productId) => {
    const data = await executeQuery('SELECT name,quantity FROM Product WHERE id=?', [productId]);
    return data;
  },

  getQuantityProductTrans: async (productId, pool) => {
    return await pool.query('SELECT quantity FROM Product WHERE id=?', [productId]);
  },

  getAllProducts: async (userId) => {
    const data = await executeQuery(
      `
      SELECT Product.id, Product.name, CartDetail.colorLink, CartDetail.size, Category.name AS categoryName, Type.name AS typeName, Product.price, Product.discount,(Product.price-Product.discount) AS priceAfterDis ,
	   CartDetail.quantity, (Product.price-Product.discount)*CartDetail.quantity AS total
    FROM User, Cart, CartDetail , Product , Color, Size, Category, Type
    WHERE User.id=Cart.userId AND Cart.id=CartDetail.cartId
    AND CartDetail.productId=Product.id
    AND CartDetail.colorLink=Color.colorLink AND Color.productId=Product.id
    AND CartDetail.size=Size.name AND Size.productId=Product.id
    AND Product.categoryId=Category.id
    AND Product.typeId=Type.id
    AND User.id=?
    `,
      [userId]
    );
    return data;
  },

  getAllProductsTrans: async (userId, pool) => {
    return await pool.query(
      `
      SELECT Product.id, Product.name, CartDetail.colorLink, CartDetail.size, Category.name AS categoryName, Type.name AS typeName, Product.price, Product.discount,(Product.price-Product.discount) AS priceAfterDis ,
	   CartDetail.quantity, (Product.price-Product.discount)*CartDetail.quantity AS total
    FROM User, Cart, CartDetail , Product , Color, Size, Category, Type
    WHERE User.id=Cart.userId AND Cart.id=CartDetail.cartId
    AND CartDetail.productId=Product.id
    AND CartDetail.colorLink=Color.colorLink AND Color.productId=Product.id
    AND CartDetail.size=Size.name AND Size.productId=Product.id
    AND Product.categoryId=Category.id
    AND Product.typeId=Type.id
    AND User.id=?
    `,
      [userId]
    );
  },

  updateQuantityProduct: async (dataUpdate) => {
    const data = await executeQuery(
      `
    UPDATE CartDetail SET quantity=?
    WHERE CartDetail.cartId =?
    AND CartDetail.productId=?
    AND CartDetail.size=?
    AND CartDetail.colorLink=?
    `,
      dataUpdate
    );
    return data;
  },

  deleteProductInCart: async (dataDelete) => {
    const data = await executeQuery(
      `
      DELETE FROM CartDetail
      WHERE CartDetail.cartId=?
      AND CartDetail.productId=?
      AND CartDetail.size=?
      AND CartDetail.colorLink=?
      `,
      // `
      // DELETE FROM CartDetail
      // WHERE (CartDetail.cartId,CartDetail.productId,CartDetail.size)
      // IN (?)
      // `,
      dataDelete
    );
    return data;
  },

  deleteProductWithCartId: async (cartId) => {
    const data = await executeQuery('DELETE FROM CartDetail WHERE CartDetail.cartId=?', [cartId]);
    return data;
  },

  deleteProductWithCartIdTrans: async (cartId, pool) => {
    return await pool.query('DELETE FROM CartDetail WHERE CartDetail.cartId=?', [cartId]);
  },
};

export default Cart;
