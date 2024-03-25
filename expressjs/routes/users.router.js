const express = require('express');
const usersRouter = express.Router();
const { getUsers, getUser, postUser } = require('../controllers/users.controller');

usersRouter.get('/', getUsers)
usersRouter.get('/:userId', getUser)
usersRouter.post('/', postUser)

module.exports = usersRouter;