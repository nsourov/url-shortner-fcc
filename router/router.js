const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");
const mongoose = require("mongoose");
const UrlToShort = require("../models/short_url");

router.get("/new/*", controller.urlToShort);
// router.get('/:shortened_url', controller.shortenedUrl)
router.get("/:shortened_url", (req, res) => {
  const { shortened_url } = req.params;
  console.log(Number(req.path.slice(1)));
  const short_url = `https://short-url-mic-fcc.herokuapp.com/${shortened_url}`;
  console.log({ b: short_url });
  UrlToShort.findOne({ shortened_url: short_url }, (err, data) => {
    if (err) {
      res.json(err);
    }
    res.redirect(data.original_url);
  });
});

module.exports = router;
