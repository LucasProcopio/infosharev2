const userRouter = require('express').Router();
const { createUser, updateUser, userAuth } = require('../controllers/usersController');

userRouter.post('/create/user', createUser );
userRouter.post('/update/user/:userId', updateUser)
userRouter.post('/user/auth', userAuth);

module.exports = userRouter;