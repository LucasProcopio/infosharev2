const userRouter = require('express').Router();
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { createUser, updateUser, userAuth } = require('../controllers/usersController');

userRouter.post('/create/user', createUser );
userRouter.post('/update/user/:userId', validateToken,  updateUser)
userRouter.post('/user/auth', userAuth);

module.exports = userRouter;