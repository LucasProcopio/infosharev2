const db = require('../models');
const { activityHelpers } = require('../helpers');
class activityService {
  async create(activity) {
    const response = { data: {}, err: false };
    try {
      response.data = await db.Activity.create(activity);
      const { dataValues } = response.data;
      await db.ActivityContribution.create({
        activityId: dataValues.id,
        userId: dataValues.authorId
      });
      return response;
    } catch (error) {
      response.err = error.message
      return response;
    }
  }

  async update({authorId, actId, data}) {
    const isValid = 
      await activityHelpers.validateUpdatePermission(authorId, actId);

    const response = { data: {}, err: false };
    if(isValid === null) {
      response.err = "User does not have permission to update this activity";
      return response;
    }

    try {
      // save old data
      const oldData = await db.Activity.findOne({
        where: {
          id: actId
        }
      });
      const {dataValues} = oldData;
      data.version = dataValues.version + 1;

      response.data = await db.Activity.update(data, {
        where: {
          id: actId,
        }
      });

      // contributor
      const addContributor = 
        await activityHelpers.shouldAddActivityContribution(authorId, actId)
      
      if(addContributor === null) {
        await db.ActivityContribution.create({
          activityId: actId,
          userId: authorId
        })
      }
      
      // history
      dataValues.version++;
      const { title, body, isPublic, isExpired, version } = dataValues;
      await db.History.create({
        authorId,
        activityId: actId,
        title,
        body,
        isPublic,
        isExpired,
        version
      });
      return response;
    } catch(error) {
      response.err = error.message;
    }
  }

  async delete({authorId, actId}) {
    const isValid = await activityHelpers.validateUpdatePermission(authorId, actId);
    if(typeof isValid === false) {
      return "User does not have permission to delete this activity";
    }
    const response = { data: {}, err: false };
    try {
      response.data = await db.Activity.destroy({
        where: {
          id: actId,
          authorId: authorId
        },
        limit: 1
      });
      return response;
    } catch(error) {
      response.err = error.message;
      return response;
    }
  }

  async findAll() {
    const response = { data: {}, err: false };
    try {
      response.data = await db.Activity.findAll();
      return response;
    } catch(error) {
      response.err = error.message;
    }
  } 
}

module.exports = new activityService();