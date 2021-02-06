const db = require('../models');

class usersHelpers {
  verifyUser(userId) {
     try {
       const data = db.User.findOne({
         where: {
           id: userid
         }
       });
       console.log(data);
       return true;
     } catch (err) {
      console.log(err.message);
       return false;
     }
  }
}

module.exports = new usersHelpers();