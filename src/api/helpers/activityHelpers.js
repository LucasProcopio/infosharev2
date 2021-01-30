const db = require('../models');
class activityHelpers {
  async validateAuthor(authorId, activityId) {
    try {
      
      const data = await  db.Activity.findOne({
        where: {
          authorId: authorId,
          id: activityId
        }
      })
      console.log(data);
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new activityHelpers();