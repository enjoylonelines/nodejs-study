const express = require('express');
const postsRouter = express.Router();
const getPost = require('../controllers/posts.controller');
postsRouter.get('/', getPost);

module.exports = postsRouter;