const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const commentController = require('../controllers/commentController');
const createPostValidation = require('../validations/createPostValidation');
const createCommentValidation = require('../validations/createCommentValidation');

router.post('/posts',[createPostValidation],postController.create);
router.post('/posts/:id',postController.update);
router.get('/posts',postController.index);
router.get('/posts/:id',postController.show);

router.post('/comments',[createCommentValidation],commentController.create);

module.exports = router;