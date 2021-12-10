import Order from '../services/order.service.js';
import Cart from '../services/cart.service.js';
import db from '../configs/db.config.js';

const addOrder = async (req, res) => {
  const promisePool = db.promise();
  const connection = await promisePool.getConnection();
  try {
    console.log('starting transaction...');
    await connection.beginTransaction();

    const {
      userId,
      paymentMethod,
      note,
      receiverName,
      receiverEmail,
      receiverPhone,
      receiverAddress,
    } = req.body;
    const dataProducts = await Cart.getAllProductsTrans(userId, connection); //await Cart.getAllProducts(userId);
    const oldCart = await Cart.getCartTrans(userId, connection); //await Cart.getCart(userId);
    let productError = [];
    let productAdd = [];
    let idOrder = new Date().valueOf().toString().substring(6, 13);
    let totalPrice = 0;

    if (dataProducts.length === 0) {
      return res.status(400).json({ message: 'Cart empty' });
    }

    for (let i = 0; i < dataProducts[0].length; i++) {
      const productId = dataProducts[0][i].id;
      const rowProduct = await Cart.getQuantityProductTrans(productId, connection); //await Cart.getQuantityProduct(productId);

      if (rowProduct[0].quantity < dataProducts[0][i].quantity) {
        productError.push({
          id: dataProducts[0][i].id,
          name: dataProducts[0][i].name,
          quantity: dataProducts[0][i].quantity,
        });
      } else {
        totalPrice +=
          (dataProducts[0][i].price - dataProducts[0][i].discount) * dataProducts[0][i].quantity;
        productAdd.push([
          idOrder,
          productId,
          dataProducts[0][i].categoryName,
          dataProducts[0][i].typeName,
          dataProducts[0][i].price,
          dataProducts[0][i].discount,
          dataProducts[0][i].name,
          dataProducts[0][i].size,
          dataProducts[0][i].colorLink,
          dataProducts[0][i].quantity,
        ]);
      }
    }

    if (productError.length !== 0) {
      return res.status(400).json({ error: productError });
    }

    //console.log(oldCart[0].id);

    console.log('tong gia', totalPrice);

    await Order.add([
      idOrder,
      userId,
      totalPrice,
      paymentMethod,
      note,
      receiverName,
      receiverEmail,
      receiverPhone,
      receiverAddress,
    ]);

    // await Order.addTrans(
    //   [
    //     idOrder,
    //     userId,
    //     totalPrice,
    //     paymentMethod,
    //     note,
    //     receiverName,
    //     receiverEmail,
    //     receiverPhone,
    //     receiverAddress,
    //   ],
    //   connection
    // );

    // await connection.query(
    //   'INSERT INTO OrderProduct (id, userId,  totalPrice, paymentMethod, note, receiverName, receiverEmail, receiverPhone, receiverAddress) VALUES (?,?,?,?,?,?,?,?,?)',
    //   [
    //     idOrder,
    //     userId,
    //     totalPrice,
    //     paymentMethod,
    //     note,
    //     receiverName,
    //     receiverEmail,
    //     receiverPhone,
    //     receiverAddress,
    //   ]
    // );

    for (let i = 0; i < productAdd.length; i++) {
      await Order.addProductTrans(productAdd[i], connection);
      await Order.updateQuantityProductTrans(
        [productAdd[i][9], productAdd[i][9], productAdd[i][1]],
        connection
      );
      // await connection.query(
      //   'INSERT INTO `OrderProductDetail`(`orderId`, `productId`,`productCategory`, `productType`, `productPrice`, `productDiscount`, `productName`, `productSize`, `productColor`, `productQuantity`) VALUES (?,?,?,?,?,?,?,?,?,?)',
      //   productAdd[i]
      // );
      // await connection.query(
      //   ' UPDATE Product SET quantity=quantity-? ,soldQuantity=soldQuantity+? WHERE id=?',
      //   [productAdd[i][9], productAdd[i][9], productAdd[i][1]]
      // );
    }

    await connection.commit();

    // await Order.add([
    //   idOrder,
    //   userId,
    //   totalPrice,
    //   paymentMethod,
    //   note,
    //   receiverName,
    //   receiverEmail,
    //   receiverPhone,
    //   receiverAddress,
    // ]);

    // for (let i = 0; i < productAdd.length; i++) {
    //   await Order.addProduct(productAdd[i]);
    //   await Order.updateQuantityProduct([productAdd[i][9], productAdd[i][9], productAdd[i][1]]);
    // }

    //-----QUAN TRỌNG-----
    //nhớ bỏ cmt này để xóa tất cả sản phẩm trong cart khi thanh toán thành công(test thì khỏi bỏ mất công phải add data lại trong cart)
    //await Cart.deleteProductWithCartIdTrans(oldCart[0].id, connection);

    return res.status(201).json({
      message: 'Add order success',
      cart: {
        products: [],
        totalPrice: 0,
        numberProducts: 0,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.info('Rollback successful');
    return res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};

//lấy ra doanh thu 12 tháng theo năm (get total one month)
const getRevenue = async (req, res) => {
  try {
    const year = parseInt(req.params.year, 10);
    let data = await Order.getRevenue(year);
    let saveMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    data.forEach((order) => {
      saveMonth.splice(saveMonth.indexOf(order.month), 1);
    });
    for (let i = 0; i < saveMonth.length; i++) {
      data.push({ month: saveMonth[i], total: 0 });
    }
    data.sort((a, b) => {
      return a.month - b.month;
    });

    //console.log(saveMonth);

    return res.status(200).json({ message: 'Done', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    let data = null;
    let strStatus = 'AND OrderProduct.status=?';
    let strTime = 'AND OrderProduct.orderDate between ? and ?';

    if (Object.values(req.body).length !== 0) {
      if (req.body.timeStart && req.body.timeEnd) {
        if (req.body.status) {
          console.log('co time va co status');
          data = await Promise.all([
            Order.getAllOrders(strTime, strStatus, [
              `${req.body.timeStart} 00:00:01`,
              `${req.body.timeEnd} 23:59:59`,
              req.body.status,
              startIndex,
              limit,
            ]),
            Order.countAllOrders('WHERE OrderProduct.orderDate between ? and ?', strStatus, [
              `${req.body.timeStart} 00:00:01`,
              `${req.body.timeEnd} 23:59:59`,
              req.body.status,
            ]),
          ]).then(([orders, totalOrders]) => {
            return {
              orders: orders,
              totalPages: Math.ceil(totalOrders[0].count / limit),
              page: page,
            };
          });
        } else {
          console.log('co time va ko co status');
          data = await Promise.all([
            Order.getAllOrders(strTime, '', [
              `${req.body.timeStart} 00:00:01`,
              `${req.body.timeEnd} 23:59:59`,
              startIndex,
              limit,
            ]),
            Order.countAllOrders('WHERE OrderProduct.orderDate between ? and ?', '', [
              `${req.body.timeStart} 00:00:01`,
              `${req.body.timeEnd} 23:59:59`,
            ]),
          ]).then(([orders, totalOrders]) => {
            return {
              orders: orders,
              totalPages: Math.ceil(totalOrders[0].count / limit),
              page: page,
            };
          });
        }
      } else {
        console.log('co status khong co time');
        data = await Promise.all([
          Order.getAllOrders('', strStatus, [req.body.status, startIndex, limit]),
          Order.countAllOrders('', 'WHERE OrderProduct.status=?', [req.body.status]),
        ]).then(([orders, totalOrders]) => {
          return {
            orders: orders,
            totalPages: Math.ceil(totalOrders[0].count / limit),
            page: page,
          };
        });
      }
    } else {
      console.log('khong co body');
      data = await Promise.all([
        Order.getAllOrders('', '', [startIndex, limit]),
        Order.countAllOrders('', '', []),
      ]).then(([orders, totalOrders]) => {
        return {
          orders: orders,
          totalPages: Math.ceil(totalOrders[0].count / limit),
          page: page,
        };
      });
    }

    //console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const userId = parseInt(req.params.id);
    let data = await Promise.all([
      Order.getOrders(userId, startIndex, limit),
      Order.countGetOrders(userId),
    ]).then(([orders, totalOrders]) => {
      return {
        orders: orders,
        totalPages: Math.ceil(totalOrders[0].count / limit),
        page: page,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Order.updateOrder(status, id);

    return res.status(200).json('Update order success');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const searchText = req.query.q;

    let arrStr = searchText.split(' ');
    let dataStr = '';
    for (let i = 0; i < arrStr.length; i++) {
      dataStr += arrStr[i] + '*'; //+ ' ';
    }

    console.log('q', dataStr);
    let data = await Promise.all([
      Order.searchOrder(startIndex, limit, /*searchText*/ dataStr),
      Order.countSearchOrder(/*searchText*/ dataStr),
    ]).then(([orders, totalOrders]) => {
      return {
        orders: orders,
        totalPages: Math.ceil(totalOrders[0].count / limit),
        page: page,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNumberSoldCategoryFollowMonth = async (req, res) => {
  try {
    const year = req.params.year;
    let categoryArr = ['Áo', 'Quần', 'Đầm váy', 'Gấu bông', 'Quà tặng', 'Đồ trang trí', 'Túi ví'];
    let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let saveMonth = [];
    let data = null;
    let newData = [];

    data = await Order.getSoldQuantityCategoryMonth(year);
    data.forEach((order) => {
      if (!saveMonth.includes(order.month)) {
        saveMonth.push(order.month);
      }
      //if (monthArr.includes(order.month)) monthArr.splice(monthArr.indexOf(order.month), 1);
    });
    for (let i = 0; i < monthArr.length; i++) {
      newData.push({
        Ao: 0,
        Quan: 0,
        DamVay: 0,
        GauBong: 0,
        QuaTang: 0,
        DoTrangTri: 0,
        TuiVi: 0,
        Month: monthArr[i],
      });
      // for (let j = 0; j < categoryArr.length; j++) {
      //   if()
      // }
    }

    console.log(saveMonth);
    console.log(newData);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//lấy số lượng bán của 8 category trong 1 tháng
const getTotalAllCategoryOneMonth = async (req, res) => {
  try {
    const month = req.params.month;
    let allCategory = ['Áo', 'Quần', 'Đầm váy', 'Gấu bông', 'Quà tặng', 'Đồ trang trí', 'Túi ví'];
    let data = await Order.getTotalAllCategoryOneMonth(month);
    for (let i = 0; i < data.length; i++) {
      allCategory.splice(allCategory.indexOf(data[i].category), 1);
    }

    for (let i = 0; i < allCategory.length; i++) {
      data.push({
        category: allCategory[i],
        month,
        total: 0,
      });
    }

    data.sort((a, b) => {
      return a.category.localeCompare(b.category);
    });

    let total = 0;
    data.forEach((dt) => {
      total += parseInt(dt.total);
    });

    console.log(allCategory);
    return res.status(200).json({ message: 'Done', data, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//lấy số doanh thu bán của 8 category trong 1 tháng
const getSaleAllCategoryOneMonth = async (req, res) => {
  try {
    const month = req.params.month;
    let allCategory = ['Áo', 'Quần', 'Đầm váy', 'Gấu bông', 'Quà tặng', 'Đồ trang trí', 'Túi ví'];
    let data = await Order.getSaleAllCategoryOneMonth(month);
    for (let i = 0; i < data.length; i++) {
      allCategory.splice(allCategory.indexOf(data[i].category), 1);
    }

    for (let i = 0; i < allCategory.length; i++) {
      data.push({
        category: allCategory[i],
        month,
        total: 0,
      });
    }

    data.sort((a, b) => {
      return a.category.localeCompare(b.category);
    });

    let total = 0;
    data.forEach((dt) => {
      total += dt.total;
    });

    console.log(allCategory);
    return res.status(200).json({ message: 'Done', data, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSaleOneCategoryAllMonths = async (req, res) => {
  try {
    const category = req.params.category;
    let data = await Order.getSaleOneCategoryAllMonths(category);
    let saveMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    data.forEach((order) => {
      saveMonth.splice(saveMonth.indexOf(order.month), 1);
    });
    for (let i = 0; i < saveMonth.length; i++) {
      data.push({ category, month: saveMonth[i], total: 0 });
    }
    data.sort((a, b) => {
      return a.month - b.month;
    });

    //console.log(saveMonth);

    return res.status(200).json({ message: 'Done', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addOrder,
  getRevenue,
  getAllOrders,
  getOrders,
  updateOrder,
  searchOrder,
  getNumberSoldCategoryFollowMonth,
  getTotalAllCategoryOneMonth,
  getSaleAllCategoryOneMonth,
  getSaleOneCategoryAllMonths,
};
