//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Comment = {
  add: async (dataComment) => {
    const data = await executeQuery(
      'INSERT INTO Comment (parentId,userId,productId,content) VALUES (?,?,?,?)',
      dataComment
    );
    return data;
  },

  get: async (productId) => {
    const data = await executeQuery(
      'SELECT Comment.*, User.name, User.isAdmin, User.mute FROM Comment, User WHERE Comment.userId=User.id AND productId=?',
      [productId]
    );
    return data;
  },

  deleteParent: async (commentId) => {
    const data = await executeQuery('DELETE FROM Comment WHERE id=?', [commentId]);
    return data;
  },

  deleteChild: async (commentId) => {
    const data = await executeQuery('DELETE FROM Comment WHERE parentId=?', [commentId]);
    return data;
  },

  getParentId: async (commentId) => {
    const data = await executeQuery('SELECT parentId FROM Comment WHERE id=?', [commentId]);
    return data;
  },

  checkUser: async (userId) => {
    const data = await executeQuery(
      `
    SELECT mute FROM User WHERE id=?
    `,
      [userId]
    );
    return data;
  },
};

export default Comment;
