const db = require('../models');
class usersHelpers {
  async verifyUser({ userId, email }) {
    const query = { where: { id: userId }};
    if(email) {
        query.where.email = email;
    }
     try {
       const user = await db.User.findOne(query);
       if(!user) return false
       return true;
     } catch (err) {
       return false;
     }
  }
}

module.exports = new usersHelpers();