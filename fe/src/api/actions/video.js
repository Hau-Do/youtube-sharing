import API from 'api';
import config from 'api/config';

const share = async (data) => {
  const response = await API({
    url: `${config.API.VIDEO_SERVICE}`,
    data,
    method: 'POST',
  });
  return response;
};

const list = async (params = {}) => {
  const response = await API({
    url: `${config.API.VIDEO_SERVICE}`,
    params,
    method: 'GET',
  });
  return response;
};

const VideoAPI = {
  share,
  list,
};

export default VideoAPI;
