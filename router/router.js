const express = require("express");
const router = express.Router();
const controller = require('../controller/controller.js')

router.get('/', controller.allUrl)
router.get('/new/(*)', controller.urlToShort)
router.get('/:urlId', controller.shortenedUrl)

module.exports = router;