//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Product = {
  getProductHome: async (limit, offset) => {
    const data = await executeQuery(
      `SELECT newProduct.id, newProduct.name, newProduct.categoryName, newProduct.typeName, newProduct.price, newProduct.discount, 			   newProduct.priceAfterDis,	
      newProduct.quantity, newProduct.arrImages, newProduct.arrColors, newProduct.arrSizes,
      CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus
        FROM (SELECT 
      pr.id,pr.name, 
   Category.name as categoryName,Type.name as typeName,pr.price,pr.discount,
     (price-discount) AS priceAfterDis,quantity,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Image.imageLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrImages,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Color.colorLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrColors,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Size.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrSizes
 FROM Product as pr, ProductStatusDetail as psd, Status, Category, Type, Image, Color, Size
 WHERE pr.id=psd.productId AND psd.statusId=Status.id AND 
       pr.categoryId=Category.id AND 
       pr.typeId=Type.id AND 
       Image.productId=pr.id AND 
       pr.id=Color.productId AND 
       pr.id=Size.productId 
      AND Status.name ="Mới"
 GROUP BY pr.id
 HAVING JSON_LENGTH(arrStatus) >= 1
 ) 
 AS newProduct, ProductStatusDetail as psd, Status
 WHERE newProduct.id=psd.productId and psd.statusId=Status.id
 GROUP BY newProduct.id
 LIMIT ?,?;`,
      [limit, offset]
    );
    return data;
  },

  countProductHome: async () => {
    const data = await executeQuery(
      `SELECT COUNT(*) as totalProduct FROM Product AS pro ,
        ProductStatusDetail AS psd 
      WHERE pro.id=psd.productId AND psd.statusId=3`
    );
    return data;
  },

  getAllProducts: async (filter, numberQuestion, strHaving, strSort) => {
    const data = await executeQuery(
      // `SELECT DISTINCT pro.id, pro.name, Category.name as categoryName,
      // Type.name as typeName,Status.name as statusName,pro.price,
      //   pro.discount,(price-discount) AS priceAfterDis,quantity
      // FROM Product AS pro ,ProductStatusDetail AS psd, Category ,Type,Status
      // WHERE pro.id=psd.productId AND psd.statusId=Status.id
      // AND pro.categoryId=Category.id and pro.typeId=Type.id ${strFilterSort} LIMIT ?,?`,
      `SELECT newProduct.id, newProduct.name, newProduct.categoryName, newProduct.typeName, newProduct.price, newProduct.discount, 			   newProduct.priceAfterDis,	
      newProduct.quantity, newProduct.arrImages, newProduct.arrColors, newProduct.arrSizes,
      CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus
        FROM (SELECT 
      pr.id,pr.name, 
      Category.name as categoryName,Type.name as typeName,pr.price,pr.discount,
     (price-discount) AS priceAfterDis,quantity,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Image.imageLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrImages,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Color.colorLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrColors,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Size.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrSizes
     FROM Product as pr, ProductStatusDetail as psd, Status, Category, Type, Image, Color, Size
     WHERE pr.id=psd.productId AND psd.statusId=Status.id AND 
       pr.categoryId=Category.id AND 
       pr.typeId=Type.id AND 
       Image.productId=pr.id AND 
       pr.id=Color.productId AND 
       pr.id=Size.productId 
      ${numberQuestion}
     GROUP BY pr.id
    ${strHaving}) 
    AS newProduct, ProductStatusDetail as psd, Status
    WHERE newProduct.id=psd.productId and psd.statusId=Status.id
    GROUP BY newProduct.id
    ${strSort}
    LIMIT ?,?`,
      filter
    );
    return data;
  },

  countAllProducts: async (strHaving, numberQuestion, filter) => {
    const data = await executeQuery(
      `
    SELECT COUNT(*) AS totalProduct FROM (SELECT psd.productId as totalProduct 
    FROM  ProductStatusDetail as psd , Status
    WHERE psd.statusId=Status.id 
    ${numberQuestion}
    GROUP BY psd.productId
    ${strHaving}) 
    AS newTable`,
      filter
    );
    return data;
  },

  getDetail: async (productId) => {
    const data = await executeQuery(
      `
    SELECT 
	    pr.id,pr.name, 
	    Category.name as categoryName,Type.name as typeName,pr.price,pr.discount,
    (price-discount) AS priceAfterDis,quantity,
    CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Image.imageLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrImages,
    CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus,
    CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Color.colorLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrColors,
    CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Size.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrSizes
  FROM Product as pr, ProductStatusDetail as psd, Status, Category, Type, Image, Color, Size
  WHERE pr.id=psd.productId AND psd.statusId=Status.id AND 
      pr.categoryId=Category.id AND 
      pr.typeId=Type.id AND 
      Image.productId=pr.id AND 
      pr.id=Color.productId AND 
      pr.id=Size.productId 
 	  AND pr.id=?`,
      productId
    );
    return data;
  },

  getProductCategory: async (filter, numberQuestion, strType, strHaving, strSort) => {
    const data = await executeQuery(
      `
   SELECT newProduct.id, newProduct.name, newProduct.categoryName, newProduct.typeName, newProduct.price, newProduct.discount, 			   newProduct.priceAfterDis,	
      newProduct.quantity, newProduct.arrImages, newProduct.arrColors, newProduct.arrSizes,
      CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus
        FROM (SELECT 
      pr.id,pr.name, 
      Category.name as categoryName,Type.name as typeName,pr.price,pr.discount,
     (price-discount) AS priceAfterDis,quantity,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Image.imageLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrImages,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Color.colorLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrColors,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Size.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrSizes
     FROM Product as pr, ProductStatusDetail as psd, Status, Category, Type, Image, Color, Size
     WHERE pr.id=psd.productId AND psd.statusId=Status.id AND 
       pr.categoryId=Category.id AND 
       pr.typeId=Type.id AND 
       Image.productId=pr.id AND 
       pr.id=Color.productId AND 
       pr.id=Size.productId 
    ${numberQuestion}
    AND Category.categoryKey=?
    ${strType}
     GROUP BY pr.id
    ${strHaving}) 
    AS newProduct, ProductStatusDetail as psd, Status
    WHERE newProduct.id=psd.productId and psd.statusId=Status.id
    GROUP BY newProduct.id
    ${strSort}
    LIMIT ?,?`,
      filter
    );
    return data;
  },

  countProductCategory: async (strType, strHaving, numberQuestion, filter) => {
    const data = await executeQuery(
      `
    SELECT COUNT(*) AS totalProduct FROM (SELECT psd.productId as totalProduct 
      FROM  ProductStatusDetail as psd , Status, Category, Type, Product as pr
      WHERE psd.statusId=Status.id AND pr.id=psd.productId AND pr.categoryId=Category.id AND pr.typeId=Type.id
      ${numberQuestion}
      AND Category.categoryKey=?
      ${strType}
      GROUP BY psd.productId
      ${strHaving}) 
      AS newTable`,
      filter
    );
    return data;
  },

  addProduct: async (dataProduct) => {
    const data = await executeQuery(
      'INSERT INTO Product (name, categoryId, typeId, price,  discount, quantity) VALUES (?,?,?,?,?,?)',
      dataProduct
    );
    return data;
  },

  getCategoryId: async (categoryName) => {
    const data = await executeQuery('SELECT id AS categoryId FROM Category WHERE Category.name=?', [
      categoryName,
    ]);
    return data;
  },

  getTypeId: async (typeName) => {
    const data = await executeQuery('SELECT id AS typeId FROM Type WHERE Type.name=?', [typeName]);
    return data;
  },

  insertImage: async (listImages) => {
    const data = await executeQuery(
      'INSERT INTO Image(imageLink, productId) VALUES (?,?)',
      listImages
    );
    return data;
  },

  insertColor: async (listColors) => {
    const data = await executeQuery(
      'INSERT INTO Color (colorLink, productId) VALUES (?,?)',
      listColors
    );
    return data;
  },

  insertSize: async (listSize) => {
    const data = await executeQuery('INSERT INTO Size (name, productId) VALUES (?,?)', listSize);
    return data;
  },

  insertProStatusDetail: async (listStatus) => {
    const data = await executeQuery(
      'INSERT INTO ProductStatusDetail (productId,statusId) VALUES (?,?)',
      listStatus
    );
    return data;
  },

  updateProduct: async (dataProduct) => {
    const data = await executeQuery(
      'UPDATE Product SET name=? , categoryId=?, typeId=?, price=?, discount=?, quantity=? WHERE id=?',
      dataProduct
    );
    return data;
  },

  deleteProduct: async (id) => {
    const data = await executeQuery('DELETE FROM Product WHERE id=?', [id]);
    return data;
  },

  deleteImage: async (id) => {
    const data = await executeQuery('DELETE FROM Image WHERE productId=?', [id]);
    return data;
  },

  deleteColor: async (id) => {
    const data = await executeQuery('DELETE FROM Color WHERE productId=?', [id]);
    return data;
  },

  deleteSize: async (id) => {
    const data = await executeQuery('DELETE FROM Size WHERE productId=?', [id]);
    return data;
  },

  deleteProStatusDetail: async (id) => {
    const data = await executeQuery('DELETE FROM ProductStatusDetail WHERE productId=?', [id]);
    return data;
  },

  searchProduct: async (strSearch, filter, numberQuestion, strHaving, strSort) => {
    const data = await executeQuery(
      /*`SELECT * FROM testfull 
      WHERE MATCH (name) AGAINST ('"${strSearch}"')`*/
      `SELECT newProduct.id, newProduct.name, newProduct.categoryName, newProduct.typeName, newProduct.price, newProduct.discount, newProduct.priceAfterDis,	
      newProduct.quantity, newProduct.arrImages, newProduct.arrColors, newProduct.arrSizes,
      CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus
        FROM (SELECT 
      pr.id,pr.name, 
      Category.name as categoryName,Type.name as typeName,pr.price,pr.discount,
     (price-discount) AS priceAfterDis,quantity,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Image.imageLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrImages,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Status.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrStatus,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Color.colorLink SEPARATOR ','), ',', '","'), '"]'), JSON) as arrColors,
     CONVERT(CONCAT('["', REPLACE(GROUP_CONCAT(DISTINCT Size.name SEPARATOR ','), ',', '","'), '"]'), JSON) as arrSizes
     FROM Product as pr, ProductStatusDetail as psd, Status, Category, Type, Image, Color, Size
     WHERE pr.id=psd.productId AND psd.statusId=Status.id AND 
       pr.categoryId=Category.id AND 
       pr.typeId=Type.id AND 
       Image.productId=pr.id AND 
       pr.id=Color.productId AND 
       pr.id=Size.productId 
      ${numberQuestion}
      AND MATCH(pr.name) AGAINST ('"${strSearch}"' IN BOOLEAN MODE)
     GROUP BY pr.id
    ${strHaving}) 
    AS newProduct, ProductStatusDetail as psd, Status
    WHERE newProduct.id=psd.productId and psd.statusId=Status.id
    GROUP BY newProduct.id
    ${strSort}
    LIMIT ?,?`,
      filter
    );
    return data;
  },

  countSearchProduct: async (strSearch, strHaving, numberQuestion, filter) => {
    const data = await executeQuery(
      `
      SELECT COUNT(*) AS totalProduct FROM (SELECT psd.productId as totalProduct 
      FROM  ProductStatusDetail as psd , Status, Product as pr
      WHERE psd.statusId=Status.id AND pr.id=psd.productId
      ${numberQuestion}
      AND MATCH(pr.name) AGAINST ('"${strSearch}"' IN BOOLEAN MODE)
      GROUP BY psd.productId
      ${strHaving}) 
      AS newTable`,
      filter
    );
    return data;
  },
};

export default Product;
