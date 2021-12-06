//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Type = {
  add: async (dataType) => {
    const data = await executeQuery(
      'INSERT INTO Type (categoryId, name, typeKey) VALUES (?,?,?)',
      dataType
    );
    return data;
  },

  updateType: async (dataType) => {
    const data = await executeQuery(
      'UPDATE Type SET categoryId=?, name=?, typeKey=? WHERE id=?',
      dataType
    );
    return data;
  },

  getProductWithTypeId: async (id) => {
    const data = await executeQuery('SELECT id FROM Product WHERE typeId=?', [id]);
    return data;
  },

  deleteType: async (id) => {
    const data = await executeQuery('DELETE FROM Type WHERE id=?', [id]);
    return data;
  },
};

export default Type;
