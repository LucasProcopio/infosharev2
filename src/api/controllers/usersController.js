const { request } = require('express');
const userRouter = require('../routes/usersRouter');
const userSchema = require('../schemas/usersSchema');
const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  
  if(error) {
    const errors = error.details.map(err => err.message);
    return res.status(404).json(errors);
  }
  const {data , err} = await usersService.create(value);

  if(err !== false) return res.status(500).json({ message: err})
  return res.json(data);
}

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  const {data , err} = await usersService.update({userId, data: userData});
  if(err !== false) return res.status(500).json({ message: err});
  if(data[0] === 0) return res.json('Update failed');
  return res.json('User successfully updated.');
}

module.exports = { createUser, updateUser };