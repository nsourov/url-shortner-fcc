const express = require("express");
const router = express.Router();
const controller = require('../controller/controller.js')

router.get('/new/*', controller.urlToShort)
router.get('/:shortened_url*', controller.shortenedUrl)

module.exports = router;