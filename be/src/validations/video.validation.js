const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    youtubeUrl: Joi.string().required(),
  }),
};

module.exports = {
  create,
};
