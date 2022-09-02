const catchAsync = require('../utils/catchAsync');
const { videoService } = require('../services');
const pick = require('../utils/pick');

const list = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const videos = await videoService.queryVideos({}, { ...options, populate: 'user' });
  res.send(videos);
});

const share = catchAsync(async (req, res) => {
  const { user } = req;
  const { youtubeUrl } = req.body;
  const video = await videoService.shareVideo(user, youtubeUrl);
  res.send({ video });
});

module.exports = {
  list,
  share,
};
