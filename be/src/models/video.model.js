const mongoose = require('mongoose');
const { MODEL } = require('../config/constants');
const { toJSON, paginate } = require('./plugins');

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    youtubeId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: MODEL.USER,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(toJSON);
videoSchema.plugin(paginate);

const Token = mongoose.model(MODEL.VIDEO, videoSchema);

module.exports = Token;
