const db = require('../models');
const { hashPass } = require('../helpers/hashPass');
const userHelper = require('../helpers/usersHelpers');

class userService {
   async create(user) {
    const response = { data: {}, err: false };
    try {
      user.password = await hashPass(user.password);
      user.actList = 0;
      response.data = await db.User.create(user);
      return response;

    } catch (error) {
      response.err = error.message
      return response;
    }
  }

  async update({ userId, data }) {
    const isValid = await userHelper.verifyUser({ userId });
    const response = { data: {}, err: false };
    if(isValid === false) {
       response.err = "User not permitted to perform this action"; 
       return response;
    } 
    try {
      response.data = await db.User.update(data, {
        where: {
          id: userId
        }
      });
      return response;
    } catch(error) {
      response.err = error.message;
      return response
    }
  }

  async findUser( email ) {
    const response = { data: {}, err: false };
    try {
      response.data = await db.User.findOne({
        where: {
          email: email
        }
      });
      return response;
    } catch(error) {
      response.err = error.message;
    }
  }
}

module.exports = new userService();