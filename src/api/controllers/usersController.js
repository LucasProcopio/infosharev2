const jwt = require('jsonwebtoken')
const userSchema = require('../schemas/usersSchema');
const usersService = require('../services/usersService');
const { validatePass }  = require('../helpers/hashPass');

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
  console.log('DATA', data);
  if(err !== false) return res.status(500).json({ message: err});
  if(data === null || data[0] === 0) return res.json('Update failed');
  return res.json('User successfully updated.');
}

const userAuth = async (req, res) => {
  const {email, password} = req.body;
  const {data, err} = await usersService.findUser(email);

  if(err !== false) return res.status(500).json({ message: err});
  if(data === null || data[0] === 0) return res.json('User not found.');
  
  const isValid = await validatePass(password, data.password);
  if(isValid === false) return res.json('E-mail or Password incorrect!');

  const user = {
    id: data.id,
    fullname: `${data.firstname} ${data.lastname}`,
    email: data.email
  };

  const token = jwt.sign({ data: user }, process.env.SECRET, { expiresIn: '1h' });
  return res.json(token);
}

module.exports = { createUser, updateUser, userAuth };