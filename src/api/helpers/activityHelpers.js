const db = require('../models');
const { Op } = require("sequelize");
class activityHelpers {
  async validateUpdatePermission(authorId, activityId) {
    try {
      const data = await  db.Activity.findOne({
        where: {
          [Op.or]: [
            { authorId: authorId },
            { isPublic: true }
          ],
          id: activityId
        }
      })
      console.log('Update permission granted for user: '+authorId);
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }

  async shouldAddActivityContribution(userId, activityId) {
    try {
      const data = await db.ActivityContribution.findOne({
        where: {
          userId: userId,
          activityId: activityId
        }
      })
      return data;
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new activityHelpers();