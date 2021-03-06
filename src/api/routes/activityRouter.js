const activityRouter = require('express').Router();
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { createActivity, updateActivity, deleteActivity, fetchActivities } = require('../controllers/activityController');

activityRouter.post('/create/activity',validateToken, createActivity);
activityRouter.post('/update/activity/:actId', validateToken, updateActivity);
activityRouter.delete('/delete/activity/:actId',validateToken, deleteActivity)
activityRouter.get('/activities',validateToken,  fetchActivities)

module.exports = activityRouter;