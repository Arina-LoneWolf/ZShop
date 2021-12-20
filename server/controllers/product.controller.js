import Product from '../services/product.service.js';

const getProductHome = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const [{ totalProduct }] = await Product.countProductHome();
    const data = await Product.getProductHome(startIndex, limit);

    console.log(data.length);
    res
      .status(200)
      .json({ products: data, totalPages: Math.ceil(totalProduct / limit), page: page });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let strSort = '';
    let strHaving = 'HAVING JSON_LENGTH(arrStatus) >= ?';
    let numberQuestion = 'AND Status.name IN (';
    let totalProduct = null;
    let data = null;

    if (req.query?.sort === '1') {
      strSort = 'ORDER BY priceAfterDis ASC';
    } else if (req.query?.sort === '-1') {
      strSort = 'ORDER BY priceAfterDis DESC';
    }

    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        for (let i = 0; i < req.query.status.length; i++) {
          if (i === req.query.status.length - 1) {
            numberQuestion += '?)';
            break;
          }
          numberQuestion += '?,';
        }
        totalProduct = await Product.countAllProducts(
          'HAVING COUNT(psd.productId) >= ?',
          numberQuestion,
          [...req.query.status, req.query.status.length]
        );

        data = await Product.getAllProducts(
          [...req.query.status, req.query.status.length, startIndex, limit],
          numberQuestion,
          strHaving,
          strSort
        );

        console.log(req.query.status);
        console.log('La arr');
        console.log('totalProduct', totalProduct[0].totalProduct);
        console.log('so sp', data.length);
      } else {
        console.log(strHaving);
        totalProduct = await Product.countAllProducts(
          'HAVING COUNT(psd.productId) >= ?',
          'AND Status.name IN (?)',
          [req.query.status, 1]
        );
        data = await Product.getAllProducts(
          [req.query.status, 1, startIndex, limit],
          'AND Status.name IN (?)',
          strHaving,
          strSort
        );
        // data = data.filter((product) => product.arrStatus.includes(req.query.status));
        // for (let i = data.length - 1; i >= 0; i--) {
        //   console.log(data[i].id);
        // }
        console.log('Ko arr');
        console.log('totalProduct', totalProduct[0].totalProduct);
        console.log('so sp', data.length);
      }
    } else {
      console.log(strSort);
      data = await Product.getAllProducts([startIndex, limit], '', '', strSort);
      totalProduct = await Product.countAllProducts('', '', []);

      console.log('data', data.length);
      console.log('totalProduct', totalProduct[0].totalProduct);
    }

    res.status(200).json({
      products: data,
      totalPages: Math.ceil(totalProduct[0].totalProduct / limit),
      page: page,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    console.log(typeof req.params.id);
    const id = parseInt(req.params.id);
    const product = await Product.getDetail([id]); //(req.params.id);
    res.status(200).json({ product: product[0] });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let strSort = '';
    let strHaving = 'HAVING JSON_LENGTH(arrStatus) >= ?';
    let strType = 'AND Type.typeKey=?';
    let numberQuestion = 'AND Status.name IN (';
    let totalProduct = null;
    let data = null;

    if (req.query?.sort === '1') {
      strSort = 'ORDER BY priceAfterDis ASC';
    } else if (req.query?.sort === '-1') {
      strSort = 'ORDER BY priceAfterDis DESC';
    }

    if (req.query.type) {
      if (req.query.status) {
        if (Array.isArray(req.query.status)) {
          for (let i = 0; i < req.query.status.length; i++) {
            if (i === req.query.status.length - 1) {
              numberQuestion += '?)';
              break;
            }
            numberQuestion += '?,';
          }
          totalProduct = await Product.countProductCategory(
            strType,
            'HAVING COUNT(psd.productId) >= ?',
            numberQuestion,
            [...req.query.status, category, req.query.type, req.query.status.length]
          );

          data = await Product.getProductCategory(
            [
              ...req.query.status,
              category,
              req.query.type,
              req.query.status.length,
              startIndex,
              limit,
            ],
            numberQuestion,
            strType,
            strHaving,
            strSort
          );

          console.log('totalProduct', totalProduct[0].totalProduct);
          console.log('data', data.length);
        } else {
          totalProduct = await Product.countProductCategory(
            strType,
            'HAVING COUNT(psd.productId) >= ?',
            'AND Status.name IN (?)',
            [req.query.status, category, req.query.type, 1]
          );
          data = await Product.getProductCategory(
            [req.query.status, category, req.query.type, 1, startIndex, limit],
            'AND Status.name IN (?)',
            strType,
            strHaving,
            strSort
          );

          console.log('totalProduct', totalProduct[0].totalProduct);
          console.log('data', data.length);
        }
      } else {
        totalProduct = await Product.countProductCategory(strType, '', '', [
          category,
          req.query.type,
        ]);
        data = await Product.getProductCategory(
          [category, req.query.type, startIndex, limit],
          '',
          strType,
          '',
          strSort
        );
        console.log('data', data.length);
        console.log('totalProduct', totalProduct[0].totalProduct);
      }
    } else {
      if (req.query.status) {
        if (Array.isArray(req.query.status)) {
          for (let i = 0; i < req.query.status.length; i++) {
            if (i === req.query.status.length - 1) {
              numberQuestion += '?)';
              break;
            }
            numberQuestion += '?,';
          }
          totalProduct = await Product.countProductCategory(
            '',
            'HAVING COUNT(psd.productId) >= ?',
            numberQuestion,
            [...req.query.status, category, req.query.status.length]
          );

          data = await Product.getProductCategory(
            [...req.query.status, category, req.query.status.length, startIndex, limit],
            numberQuestion,
            '',
            strHaving,
            strSort
          );

          console.log('totalProduct', totalProduct[0].totalProduct);
          console.log('data', data.length);
        } else {
          totalProduct = await Product.countProductCategory(
            '',
            'HAVING COUNT(psd.productId) >= ?',
            'AND Status.name IN (?)',
            [req.query.status, category, 1]
          );
          data = await Product.getProductCategory(
            [req.query.status, category, 1, startIndex, limit],
            'AND Status.name IN (?)',
            '',
            strHaving,
            strSort
          );

          console.log('totalProduct', totalProduct[0].totalProduct);
          console.log('data', data.length);
        }
      } else {
        totalProduct = await Product.countProductCategory('', '', '', [category]);
        data = await Product.getProductCategory([category, startIndex, limit], '', '', '', strSort);
        console.log('data', data.length);
        console.log('totalProduct', totalProduct[0].totalProduct);
      }
    }
    res.status(200).json({
      products: data,
      totalPages: Math.ceil(totalProduct[0].totalProduct / limit),
      page: page,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, type, price, quantity, images, colors, status, sizes } = req.body;
    const objStatus = {
      'Không có': 1,
      'Khuyến mãi': 2,
      Mới: 3,
      'Bán chạy': 4,
    };
    const [{ categoryId }] = await Product.getCategoryId(category);
    const [{ typeId }] = await Product.getTypeId(type);

    let discount = !req.body.discount ? 0 : req.body.discount;
    // let newImages = [];
    // let newColors = [];
    // let newSizes = [];
    // let newStatus = [];
    let newProduct = await Product.addProduct([
      name,
      categoryId,
      typeId,
      price,
      discount,
      quantity,
    ]);

    for (let i = 0; i < images.length; i++) {
      //newImages.push([images[i], newProduct.insertId]);
      await Product.insertImage([images[i], newProduct.insertId]);
    }

    for (let i = 0; i < colors.length; i++) {
      //newColors.push([colors[i], newProduct.insertId]);
      await Product.insertColor([colors[i], newProduct.insertId]);
    }

    for (let i = 0; i < sizes.length; i++) {
      //newSizes.push([sizes[i], newProduct.insertId]);
      await Product.insertSize([sizes[i], newProduct.insertId]);
    }

    for (let i = 0; i < status.length; i++) {
      //newStatus.push([newProduct.insertId, objStatus[status[i]]]);
      await Product.insertProStatusDetail([newProduct.insertId, objStatus[status[i]]]);
    }

    // await Product.insertColor(newColors);
    //await Product.insertSize(newSizes);
    //await Product.insertProStatusDetail(newStatus);

    return res.status(201).json({ message: 'Add product success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, category, type, price, quantity, images, colors, status, sizes } = req.body;
    const id = req.params.id;
    const [{ categoryId }] = await Product.getCategoryId(category);
    const [{ typeId }] = await Product.getTypeId(type);
    const objStatus = {
      'Không có': 1,
      'Khuyến mãi': 2,
      Mới: 3,
      'Bán chạy': 4,
    };

    let discount = !req.body.discount ? 0 : req.body.discount;
    // let newImages = [];
    // let newColors = [];
    // let newSizes = [];
    // let newStatus = [];

    await Product.updateProduct([name, categoryId, typeId, price, discount, quantity, id]);
    Promise.all([
      Product.deleteImage(id),
      Product.deleteColor(id),
      Product.deleteSize(id),
      Product.deleteProStatusDetail(id),
    ]);

    for (let i = 0; i < images.length; i++) {
      //newImages.push([images[i], id]);
      await Product.insertImage([images[i], id]);
    }

    for (let i = 0; i < colors.length; i++) {
      //newColors.push([colors[i], id]);
      await Product.insertColor([colors[i], id]);
    }

    for (let i = 0; i < sizes.length; i++) {
      //newSizes.push([sizes[i], id]);
      await Product.insertSize([sizes[i], id]);
    }

    for (let i = 0; i < status.length; i++) {
      //newStatus.push([id, objStatus[status[i]]]);
      await Product.insertProStatusDetail([id, objStatus[status[i]]]);
    }

    //Promise.all([

    //await Product.insertImage(newImages);
    //await Product.insertColor(newColors);
    //await Product.insertSize(newSizes);
    //await Product.insertProStatusDetail(newStatus);
    //]);

    return res.status(200).json({ message: 'Update product success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    Promise.all([
      Product.deleteProduct(id),
      Product.deleteImage(id),
      Product.deleteColor(id),
      Product.deleteSize(id),
      Product.deleteProStatusDetail(id),
    ]);

    return res.status(200).json({ message: 'Delete product success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const strSearch = req.query.name.trim();
    //console.log(typeof strSearch);

    let arrStr = strSearch.split(' ');
    let dataStr = '';
    for (let i = 0; i < arrStr.length; i++) {
      if (arrStr !== '')
        dataStr += '+' + arrStr[i] + '*' + ' ';
    }

    dataStr.trim();

    console.log('KKO', dataStr);

    let strSort = '';
    let strHaving = 'HAVING JSON_LENGTH(arrStatus) >= ?';
    let numberQuestion = 'AND Status.name IN (';
    let totalProduct = null;
    let data = null;

    if (req.query?.sort === '1') {
      strSort = 'ORDER BY priceAfterDis ASC';
    } else if (req.query?.sort === '-1') {
      strSort = 'ORDER BY priceAfterDis DESC';
    }

    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        for (let i = 0; i < req.query.status.length; i++) {
          if (i === req.query.status.length - 1) {
            numberQuestion += '?)';
            break;
          }
          numberQuestion += '?,';
        }
        totalProduct = await Product.countSearchProduct(
          dataStr /*strSearch*/,
          'HAVING COUNT(psd.productId) >= ?',
          numberQuestion,
          [...req.query.status, req.query.status.length]
        );

        data = await Product.searchProduct(
          dataStr /*strSearch*/,
          [...req.query.status, req.query.status.length, startIndex, limit],
          numberQuestion,
          strHaving,
          strSort
        );

        console.log(req.query.status);
        console.log('La arr');
        console.log('totalProduct', totalProduct[0].totalProduct);
        console.log('so sp', data.length);
      } else {
        console.log(strHaving);
        totalProduct = await Product.countSearchProduct(
          dataStr /*strSearch*/,
          'HAVING COUNT(psd.productId) >= ?',
          'AND Status.name IN (?)',
          [req.query.status, 1]
        );
        data = await Product.searchProduct(
          dataStr /*strSearch*/,
          [req.query.status, 1, startIndex, limit],
          'AND Status.name IN (?)',
          strHaving,
          strSort
        );

        console.log('Ko arr');
        console.log('totalProduct', totalProduct[0].totalProduct);
        console.log('so sp', data.length);
      }
    } else {
      console.log(strSort);
      data = await Product.searchProduct(
        dataStr /*strSearch*/,
        [startIndex, limit],
        '',
        '',
        strSort
      );
      totalProduct = await Product.countSearchProduct(dataStr /*strSearch*/, '', '', []);

      console.log('data', data.length);
      console.log('totalProduct', totalProduct[0].totalProduct);
    }

    res.status(200).json({
      products: data,
      totalPages: Math.ceil(totalProduct[0].totalProduct / limit),
      page: page,
      search: strSearch,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const groupByStatus = (list) => {
//   let arr = [...list];
//   const map = new Map();
//   arr.forEach((item) => {
//     const collection = map.get(item.id);
//     if (!collection) {
//       let saveStatus = item.statusName;
//       item.statusName = [];
//       item.statusName.push(saveStatus);
//       map.set(item.id, item);
//     } else {
//       collection.statusName.push(item.statusName);
//     }
//   });
//   return [...map.values()];
// };

export default {
  getProductHome,
  getAllProducts,
  getProductDetail,
  getProductCategory,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
