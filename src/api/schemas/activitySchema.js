const joi = require('joi');

module.exports = joi.object({
  authorId: joi.number().required(),
  title: joi.string().max(255).required(),
  body: joi.string().required(),
  isPublic: joi.boolean(),
  isExpired: joi.boolean(),
  version: joi.string()
});

