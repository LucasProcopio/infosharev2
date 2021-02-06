const router = require('express').Router();
const userRouter = require('./usersRouter');
const activityRouter = require('./activityRouter');

router.use(activityRouter);
router.use(userRouter);

module.exports = router;