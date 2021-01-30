const router = require('express').Router();
const { createActivity, updateActivity, deleteActivity, fetchActivities } = require('../controllers/activityController');

router.post('/create/activity', createActivity);
router.post('/update/activity/:actId', updateActivity);
router.delete('/delete/activity/:actId', deleteActivity)
router.get('/activities', fetchActivities)

module.exports = router;