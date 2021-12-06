//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Category = {
  add: async (dataCategory) => {
    const data = await executeQuery(
      'INSERT INTO Category (name, categoryKey) VALUES (?,?)',
      dataCategory
    );
    return data;
  },

  getAll: async () => {
    const data = await executeQuery(
      //     `
      // SELECT DISTINCT newCategory.name as categoryName, newCategory.categoryKey,
      // CONVERT(CONCAT('[', GROUP_CONCAT(DISTINCT newCategory.objectType), ']'), JSON) AS types
      // FROM
      // (SELECT Category.name, Category.categoryKey,
      // JSON_OBJECT('typeKey', Type.typeKey, 'typeName',Type.name) AS objectType
      // FROM Type,Category
      // WHERE Category.id=Type.categoryId) AS newCategory
      // GROUP BY newCategory.name, newCategory.categoryKey`);
      `
      SELECT DISTINCT newCategory.id,newCategory.name as categoryName, newCategory.categoryKey, 
      CONVERT(CONCAT('[', GROUP_CONCAT(DISTINCT newCategory.objectType), ']'), JSON) AS types
      FROM
      (SELECT Category.id, Category.name, Category.categoryKey, 
      JSON_OBJECT('typeId', Type.id, 'typeKey', Type.typeKey, 'typeName',Type.name) AS objectType
      FROM Type RIGHT JOIN Category ON 
      Category.id=Type.categoryId) AS newCategory
      GROUP BY newCategory.Id, newCategory.name, newCategory.categoryKey
    `
    );
    return data;
  },

  getTypeWithCategoryId: async (id) => {
    const data = await executeQuery('SELECT id FROM Type WHERE categoryId=?', [id]);
    return data;
  },

  getProductWithCategoryId: async (id) => {
    const data = await executeQuery('SELECT id FROM Product WHERE categoryId=?', [id]);
    return data;
  },

  deleteCategory: async (id) => {
    const data = await executeQuery('DELETE FROM Category WHERE id=?', [id]);
    return data;
  },

  updateCategory: async (dataCategory) => {
    const data = await executeQuery(
      'UPDATE Category SET name=? ,categoryKey=? WHERE id=?',
      dataCategory
    );
    return data;
  },
};

export default Category;
