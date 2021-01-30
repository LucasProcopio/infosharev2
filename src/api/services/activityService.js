const db = require('../models');
const { activityHelpers } = require('../helpers');
const { response } = require('express');
class activityService {
  async create(activity) {
    const response = { data: {}, err: false };
    try {
      response.data = await db.Activity.create(activity);
      return response;
    } catch (error) {
      response.err = error.message
      return response;
    }
  }

  async update({authorId, actId, data}) {
    const isValid = await activityHelpers.validateAuthor(authorId, actId);
    if(typeof isValid === null) {
      return "User does not have permission to update this activity";
    }
    const response = { data: {}, err: false };
    try {
      response.data = await db.Activity.update(data, {
        where: {
          id: actId,
          authorId: authorId
        }
      });
      return response;
    } catch(error) {
      response.err = error.message;
    }
  }

  async delete({authorId, actId}) {
    const isValid = await activityHelpers.validateAuthor(authorId, actId);
    if(typeof isValid === null) {
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