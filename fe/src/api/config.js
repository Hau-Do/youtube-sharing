const REACT_APP_API_URL =
  process.env.REACT_APP_RESTFUL_ENDPOINT || 'http://localhost:3001';

const config = {
  API: {
    AUTH_SERVICE: '/auth',
    VIDEO_SERVICE: '/video',
  },
};

Object.keys(config.API).forEach((item) => {
  config.API[item] = REACT_APP_API_URL + config.API[item];
});

export default config;
