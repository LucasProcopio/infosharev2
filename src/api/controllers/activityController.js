const activitySchema = require('../schemas/activitySchema');
const activityService = require('../services/activityService');

const createActivity = async (req, res) => {
    const {value, error} = activitySchema.validate(req.body);
    if(error) {
      const errors = error.details.map(err => err.message);
      return res.status(404).json(errors);
    }
    const {data , err} = await activityService.create(value);

    if(err !== false) return res.status(500).json({ message: err})
    return res.json(data);
};

const updateActivity = async (req, res) => {
  const updateData = req.body;
  const { actId } = req.params;
  const { err} = await activityService.update({ authorId: updateData.authorId, actId, data: updateData })
  if(err) {
    return res.status(400).json({ message: err});
  }
  return res.json('Activity successfully updated');
}

const deleteActivity = async (req, res) => {
  const { authorId } = req.body;
  const { actId } = req.params;
  const {err} = await activityService.delete({ authorId, actId })
  if(err) {
    return res.status(400).json({ message: err});
  }
  return res.json('Activity successfully Deleted');
}

const fetchActivities = async (req, res) => {
  const { data, err} = await activityService.findAll()
  if(err) {
    return res.status(400).json({ message: err});
  }
  return res.json(data);
}


module.exports = { createActivity, updateActivity, fetchActivities, deleteActivity }