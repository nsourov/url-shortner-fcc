const mongoose = require("mongoose");
const UrlToShort = require("../models/short_url");

const urlToShort = (req, res) => {
  const {urlToShort} = req.params;
  const regexForCheckValidUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
  if (regexForCheckValidUrl.test(urlToShort)) {
    const randomNum = Math.floor(Math.random() * 1000).toString();
    const short_url = `https://short-url-mic-fcc.herokuapp.com/${randomNum}`;
    let objModel = {
      original_url: "",
      shortened_url: ""
    };
    let newUrl = new UrlToShort({
      original_url: urlToShort,
      shortened_url: short_url
    });
    const checkForhttp = new RegExp("^(http||https)://", "i");
    if (checkForhttp.test(urlToShort) === false) {
      newUrl = new UrlToShort({
        original_url: `http://${urlToShort}`,
        shortened_url: short_url
      });
    }
    newUrl.save((err, url) => {
      if (err) {
        res.json(err);
      }
      objModel = {
        original_url: url.original_url,
        shortened_url: url.shortened_url
      };
      res.json(objModel);
    });
  } else {
    res.json({ error: "invalid url" });
  }
};

const shortenedUrl = async (req, res) => {
  const { urlToForward } = await req.params;
  console.log(req.params)
  const short_url = `https://short-url-mic-fcc.herokuapp.com/${urlToForward}`;
 await UrlToShort.findOne({ 'shortened_url': short_url }, (err, data) => {
    if (err) {
      res.json(err);
    }
   res.redirect(301, data.original_url);
  });
};

module.exports = {urlToShort, shortenedUrl}
