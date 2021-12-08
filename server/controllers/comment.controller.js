import Comment from '../services/comment.service.js';

const addComment = async (req, res) => {
  try {
    const { parentId, userId, productId, content } = req.body;
    const checkUser = await Comment.checkUser(userId);
    if (checkUser[0].mute === 1) {
      return res.status(400).json({ message: 'User is muted' });
    }
    await Comment.add([parentId, userId, productId, content]);
    return res.status(201).json({ message: 'Add product success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const data = await Comment.get(req.params.productId);
    const comments = groupReply(data);

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const groupReply = (list) => {
  let arr = [...list];
  const map = new Map();
  let collection = null;
  arr.forEach((item) => {
    if (item.parentId === 0) {
      collection = map.get(item.id);
      if (!collection) {
        item.reply = [];
        map.set(item.id, item);
      }
    } else {
      collection = map.get(item.parentId);
      if (collection) collection.reply.push(item);
    }
  });
  return [...map.values()];
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const [{ parentId }] = await Comment.getParentId(commentId);

    if (parentId === 0) {
      Promise.all([Comment.deleteParent(commentId), Comment.deleteChild(commentId)]);
    } else {
      await Comment.deleteParent(commentId);
    }

    return res.status(200).json({ message: 'Delete comment success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addComment,
  getComment,
  deleteComment,
};
