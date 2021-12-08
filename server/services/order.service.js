//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Order = {
  add: async (dataOrder) => {
    const data = await executeQuery(
      'INSERT INTO OrderProduct (id, userId,  totalPrice, paymentMethod, note, receiverName, receiverEmail, receiverPhone, receiverAddress) VALUES (?,?,?,?,?,?,?,?,?)',
      dataOrder
    );
    return data;
  },

  addTrans: async (dataOrder, pool) => {
    return await pool.query(
      'INSERT INTO OrderProduct (id, userId,  totalPrice, paymentMethod, note, receiverName, receiverEmail, receiverPhone, receiverAddress) VALUES (?,?,?,?,?,?,?,?,?)',
      dataOrder
    );
  },

  addProduct: async (dataProduct) => {
    const data = await executeQuery(
      //   `INSERT INTO OrderProductDetail (orderId, productId, productPrice, productDiscount, productName, productSize, productColor, productQuantity)
      //    VALUES ?,?,?,?,?,?,?,?`,
      'INSERT INTO `OrderProductDetail`(`orderId`, `productId`,`productCategory`, `productType`, `productPrice`, `productDiscount`, `productName`, `productSize`, `productColor`, `productQuantity`) VALUES (?,?,?,?,?,?,?,?,?,?)',
      dataProduct
    );
    return data;
  },

  addProductTrans: async (dataProduct, pool) => {
    return await pool.query(
      'INSERT INTO `OrderProductDetail`(`orderId`, `productId`,`productCategory`, `productType`, `productPrice`, `productDiscount`, `productName`, `productSize`, `productColor`, `productQuantity`) VALUES (?,?,?,?,?,?,?,?,?,?)',
      dataProduct
    );
  },

  updateQuantityProduct: async (dataProduct) => {
    const data = await executeQuery(
      `
    UPDATE Product SET quantity=quantity-? ,soldQuantity=soldQuantity+? WHERE id=?
    `,
      dataProduct
    );
    return data;
  },

  updateQuantityProductTrans: async (dataProduct, pool) => {
    return await pool.query(
      `
    UPDATE Product SET quantity=quantity-? ,soldQuantity=soldQuantity+? WHERE id=?
    `,
      dataProduct
    );
  },

  getRevenue: async (year) => {
    const data = await executeQuery(
      `
      select month(OrderProduct.orderDate) as month ,sum(OrderProduct.totalPrice) as total
      from OrderProduct
      where year(OrderProduct.orderDate)=? and OrderProduct.status=3
      group by year(OrderProduct.orderDate),month(OrderProduct.orderDate)
      order by year(OrderProduct.orderDate),month(OrderProduct.orderDate)
    `,
      [year]
    );
    return data;
  },

  getAllOrders: async (strTime, strStatus, filter) => {
    const data = await executeQuery(
      `
  SELECT newTable.orderId,
    newTable.orderDate,
    newTable.receiverInfo,
    newTable.status,
    newTable.shippingFee,
    SUM(total) as total,
    newTable.paymentMethod,
    newTable.userInfo,
     CONVERT(CONCAT('[', GROUP_CONCAT(DISTINCT newTable.objectProduct), ']'), JSON) AS products
  FROM
      (SELECT DISTINCT OrderProduct.id AS orderId ,OrderProduct.status, OrderProduct.shippingFee, OrderProduct.paymentMethod, OrderProduct.orderDate,
      JSON_OBJECT('name', OrderProduct.receiverName, 'phone',OrderProduct.receiverPhone,'email',OrderProduct.receiverEmail
             ,'address',OrderProduct.receiverAddress,'note',OrderProduct.note) AS receiverInfo,
      JSON_OBJECT('name', User.name, 'email',User.email,'id',User.id
              ,'type',User.isAdmin,'address',User.adress,'city',User.city,'district',User.district) AS userInfo,    	
              JSON_OBJECT('name',OrderProductDetail.productName, 'categoryName',OrderProductDetail.productCategory,
              'typeName', OrderProductDetail.productType,'price',OrderProductDetail.productPrice,'discount'
               ,OrderProductDetail.productDiscount,'size',OrderProductDetail.productSize
             ,'color',OrderProductDetail.productColor,'id',OrderProductDetail.productId
             ,'soldQuantity',OrderProductDetail.productQuantity) 
       AS objectProduct,
      SUM((OrderProductDetail.productPrice-OrderProductDetail.productDiscount)*OrderProductDetail.productQuantity) AS total
    FROM OrderProductDetail, OrderProduct, User
    WHERE OrderProduct.id=OrderProductDetail.orderId
    AND OrderProduct.userId=User.id
    ${strTime}
    ${strStatus}
    GROUP BY OrderProduct.id, userInfo, receiverInfo, objectProduct
    ) AS newTable
    GROUP BY newTable.orderId, newTable.receiverInfo, newTable.userInfo, 
             newTable.paymentMethod, newTable.status, newTable.shippingFee, 
             newTable.orderDate
    ORDER BY newTable.orderDate DESC
    LIMIT ?,?
    `,
      filter
    );
    return data;
  },

  countAllOrders: async (strTime, strStatus, filter) => {
    const data = await executeQuery(
      `
    SELECT COUNT(DISTINCT OrderProduct.id) as count
    FROM OrderProduct
    ${strTime}
    ${strStatus}
    `,
      filter
    );
    return data;
  },

  getOrders: async (userId, limit, offset) => {
    const data = await executeQuery(
      `
    SELECT newTable.orderId,
		newTable.orderDate,
	   newTable.receiverInfo,
	   newTable.status,
       newTable.shippingFee,
       SUM(total) as total,
      newTable.paymentMethod,
       newTable.userInfo,
 	  CONVERT(CONCAT('[', GROUP_CONCAT(DISTINCT newTable.objectProduct), ']'), JSON) AS products
FROM
(SELECT DISTINCT OrderProduct.id AS orderId ,OrderProduct.status, OrderProduct.shippingFee, OrderProduct.paymentMethod, OrderProduct.orderDate,
	JSON_OBJECT('name', OrderProduct.receiverName, 'phone',OrderProduct.receiverPhone,'email',OrderProduct.receiverEmail
               ,'address',OrderProduct.receiverAddress,'note',OrderProduct.note) AS receiverInfo,
	JSON_OBJECT('name', User.name, 'email',User.email,'id',User.id
                ,'type',User.isAdmin,'address',User.adress,'city',User.city,'district',User.district) AS userInfo,    	
                JSON_OBJECT('name',OrderProductDetail.productName, 'categoryName',OrderProductDetail.productCategory,
                'typeName', OrderProductDetail.productType,'price',OrderProductDetail.productPrice,'discount'
               	,OrderProductDetail.productDiscount,'size',OrderProductDetail.productSize
               ,'color',OrderProductDetail.productColor,'id',OrderProductDetail.productId
               ,'soldQuantity',OrderProductDetail.productQuantity)
 	AS objectProduct,
 SUM((OrderProductDetail.productPrice-OrderProductDetail.productDiscount)*OrderProductDetail.productQuantity) AS total
FROM OrderProductDetail, OrderProduct, User
WHERE OrderProduct.id=OrderProductDetail.orderId
AND OrderProduct.userId=User.id
AND OrderProduct.userId=?
GROUP BY OrderProduct.id, userInfo, receiverInfo, objectProduct
) AS newTable
GROUP BY newTable.orderId, newTable.receiverInfo, newTable.userInfo, newTable.paymentMethod, newTable.status, newTable.shippingFee, newTable.orderDate
ORDER BY newTable.orderDate DESC
LIMIT ?,?
    `,
      [userId, limit, offset]
    );
    return data;
  },

  countGetOrders: async (userId) => {
    const data = await executeQuery(
      `
    SELECT COUNT(DISTINCT OrderProduct.id) as count
    FROM OrderProduct
    WHERE OrderProduct.userId=?
    `,
      [userId]
    );
    return data;
  },

  updateOrder: async (status, orderId) => {
    const data = await executeQuery(
      `
      UPDATE OrderProduct SET status=? WHERE OrderProduct.id=?
    `,
      [status, orderId]
    );
    return data;
  },

  searchOrder: async (limit, offset, strSearch) => {
    const data = await executeQuery(
      `
  SELECT newTable.orderId,
    newTable.orderDate,
    newTable.receiverInfo,
    newTable.status,
    newTable.shippingFee,
    SUM(total) as total,
    newTable.paymentMethod,
    newTable.userInfo,
     CONVERT(CONCAT('[', GROUP_CONCAT(DISTINCT newTable.objectProduct), ']'), JSON) AS products
  FROM
      (SELECT DISTINCT OrderProduct.id AS orderId ,OrderProduct.status, OrderProduct.shippingFee, OrderProduct.paymentMethod, OrderProduct.orderDate,
      JSON_OBJECT('name', OrderProduct.receiverName, 'phone',OrderProduct.receiverPhone,'email',OrderProduct.receiverEmail
             ,'address',OrderProduct.receiverAddress,'note',OrderProduct.note) AS receiverInfo,
      JSON_OBJECT('name', User.name, 'email',User.email,'id',User.id
              ,'type',User.isAdmin,'address',User.adress,'city',User.city,'district',User.district) AS userInfo,    	
      JSON_OBJECT('name',OrderProductDetail.productName, 'categoryName',OrderProductDetail.productCategory,
              'typeName', OrderProductDetail.productType,'price',OrderProductDetail.productPrice,'discount'
               ,OrderProductDetail.productDiscount,'size',OrderProductDetail.productSize
             ,'color',OrderProductDetail.productColor,'id',OrderProductDetail.productId
             ,'soldQuantity',OrderProductDetail.productQuantity)
       AS objectProduct,
      SUM((OrderProductDetail.productPrice-OrderProductDetail.productDiscount)*OrderProductDetail.productQuantity) AS total
    FROM OrderProductDetail, OrderProduct, User
    WHERE OrderProduct.id=OrderProductDetail.orderId
    AND OrderProduct.userId=User.id
    AND MATCH(OrderProduct.receiverName,OrderProduct.id,OrderProduct.receiverPhone) AGAINST ('${strSearch}' IN BOOLEAN MODE)
    GROUP BY OrderProduct.id, userInfo, receiverInfo, objectProduct
    ) AS newTable
    GROUP BY newTable.orderId, newTable.receiverInfo, newTable.userInfo, 
             newTable.paymentMethod, newTable.status, newTable.shippingFee, 
             newTable.orderDate
    ORDER BY newTable.orderDate DESC
    LIMIT ?,?
    `,
      [limit, offset]
    );
    return data;
  },

  // AGAINST ('"${strSearch}"' IN BOOLEAN MODE)
  countSearchOrder: async (strSearch) => {
    const data = await executeQuery(
      `
    SELECT COUNT(DISTINCT OrderProduct.id) as count
    FROM OrderProduct
    WHERE MATCH(OrderProduct.receiverName,OrderProduct.id,OrderProduct.receiverPhone) 
    AGAINST ('${strSearch}' IN BOOLEAN MODE)
    `
    );
    return data;
  },

  getSoldQuantityCategoryMonth: async (year) => {
    const data = await executeQuery(
      `
      select Category.name as category, month(OrderProduct.orderDate) as month, IFNULL(CONVERT(SUM(OrderProductDetail.productQuantity),UNSIGNED INTEGER),0) as total
      from 
      OrderProduct,
      OrderProductDetail RIGHT JOIN 
       Category ON OrderProductDetail.productCategory=Category.name
      WHERE OrderProduct.status=3 
      AND year(OrderProduct.orderDate)=2021 AND OrderProductDetail.orderId=OrderProduct.id
      GROUP BY category, month(OrderProduct.orderDate)
      ORDER BY month(OrderProduct.orderDate) 
    `,
      [year]
    );
    return data;
  },

  getTotalAllCategoryOneMonth: async (month) => {
    const data = await executeQuery(
      `
    select Category.name as category, month(OrderProduct.orderDate) as month, IFNULL(CONVERT(SUM(OrderProductDetail.productQuantity),UNSIGNED INTEGER),0) as total
      from 
      OrderProduct,
      OrderProductDetail RIGHT JOIN 
      Category ON OrderProductDetail.productCategory=Category.name
      WHERE OrderProduct.status=3 
      AND year(OrderProduct.orderDate)=2021 AND OrderProductDetail.orderId=OrderProduct.id
      AND month(OrderProduct.orderDate)=?
      GROUP BY category, month(OrderProduct.orderDate)
      ORDER BY month(OrderProduct.orderDate) 
    `,
      [month]
    );
    return data;
  },

  getSaleAllCategoryOneMonth: async (month) => {
    const data = await executeQuery(
      `
      select Category.name as category, month(OrderProduct.orderDate) as month, 
SUM(OrderProductDetail.productQuantity*(OrderProductDetail.productPrice-OrderProductDetail.productDiscount)) as total
      from 
      OrderProduct,
      OrderProductDetail,
      Category 
      WHERE OrderProduct.status=3 
      AND year(OrderProduct.orderDate)=2021 AND OrderProductDetail.orderId=OrderProduct.id
      AND OrderProductDetail.productCategory=Category.name
      AND month(OrderProduct.orderDate)=?
      GROUP BY category, month(OrderProduct.orderDate)
      ORDER BY month(OrderProduct.orderDate) `,
      [month]
    );
    return data;
  },

  getSaleOneCategoryAllMonths: async (category) => {
    const data = await executeQuery(
      `
      select Category.name as category, month(OrderProduct.orderDate) as month, 
SUM(OrderProductDetail.productQuantity) as total
      from 
      OrderProduct,
      OrderProductDetail,
      Category 
      WHERE OrderProduct.status=3 
      AND year(OrderProduct.orderDate)=2021 AND OrderProductDetail.orderId=OrderProduct.id
      AND OrderProductDetail.productCategory=Category.name
      AND Category.name=?
      GROUP BY category, month(OrderProduct.orderDate)
      ORDER BY month(OrderProduct.orderDate) 
      `,
      [category]
    );
    return data;
  },
};

export default Order;
