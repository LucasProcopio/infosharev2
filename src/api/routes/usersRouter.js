const userRouter = require('express').Router();
const { createUser, updateUser } = require('../controllers/usersController');

userRouter.post('/create/user', createUser );
userRouter.post('/update/user/:userId', updateUser)
module.exports = userRouter;