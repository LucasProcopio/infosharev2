const activityRouter = require('express').Router();
const { createActivity, updateActivity, deleteActivity, fetchActivities } = require('../controllers/activityController');

activityRouter.post('/create/activity', createActivity);
activityRouter.post('/update/activity/:actId', updateActivity);
activityRouter.delete('/delete/activity/:actId', deleteActivity)
activityRouter.get('/activities', fetchActivities)

module.exports = activityRouter;