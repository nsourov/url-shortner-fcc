const express = require("express");
const router = express.Router();
const controller = require('../controller/controller.js')

router.get('/new/:urlToShort', controller.urlToShort)
router.get('/:urlToForward', controller.shortenedUrl)

module.exports = router;