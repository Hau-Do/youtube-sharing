const express = require('express');
const validate = require('../middlewares/validate');
const videoValidation = require('../validations/video.validation');
const auth = require('../middlewares/auth');
const videoController = require('../controllers/video.controller');

const router = express.Router();

router.route('/').get(videoController.list).post(auth(), validate(videoValidation.create), videoController.share);

module.exports = router;
