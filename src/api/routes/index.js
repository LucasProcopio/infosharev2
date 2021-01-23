const router = require('express').Router();
const { createActivity } = require('../controllers/activityController');

router.post('/create/activity', createActivity);

module.exports = router;