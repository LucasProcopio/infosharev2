const activitySchema = require('../schemas/activitySchema');
const activityService = require('../services/activityService');

const createActivity = (req, res) => {
    const {value, error} = activitySchema.validate(req.body);
    if(error) {
      const errors = error.details.map(err => err.message);
      return res.status(404).json(errors);
    }
    const data = activityService.create(value);
    return res.json(data);
};

module.exports = { createActivity }