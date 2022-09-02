const httpStatus = require('http-status');
const config = require('../config/config');
const { Video } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios').default;
const queryVideos = async (filter, options) => {
  const videos = await Video.paginate(filter, options);
  return videos;
};

const shareVideo = async (user, url) => {
  const id = url?.split('v=')?.[1];
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, 'Please input correct url');
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${config.youtubeApiKey}&part=snippet`;
  try {
    const { data } = await axios.get(youtubeApiUrl);
    const [item] = data.items;
    const videoBody = {
      title: item?.snippet?.title,
      description: item?.snippet?.description,
      thumbnail: item?.snippet?.thumbnails?.high?.url,
      youtubeId: id,
      user: user?._id,
    };
    const response = await createVideo(videoBody);
    return response;
  } catch (error) {
    throw error;
  }
};

const createVideo = async (videoBody) => {
  return Video.create(videoBody);
};

module.exports = {
  shareVideo,
  queryVideos,
};
