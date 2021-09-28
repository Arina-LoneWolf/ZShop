const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.post('/add', auth, commentController.addComment);

router.get('/get', commentController.getComment);

router.delete('/delete', auth, authAdmin, commentController.deleteComment);

module.exports = router;
