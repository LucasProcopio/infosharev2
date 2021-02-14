const db = require('../models');
class usersHelpers {
  verifyUser(userId) {
     try {
       const data = db.User.findOne({
         where: {
           id: userid
         }
       });
       return true;
     } catch (err) {
       return false;
     }
  }
}

module.exports = new usersHelpers();