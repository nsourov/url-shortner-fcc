const mongoose = require("mongoose");
const Url = require("../models/short_url");

const allUrl = async (req,res) => {
 await Url.find({},(err,result) => {
    if(err){
      console.log(err)
    }
    res.json(result)
  })
}

const urlToShort = async (req, res) => {
  const original_url = req.params[0].match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    const randNum = Math.floor(Math.random() * 1000).toString()
    const shortened_url  = `${req.protocol}://${req.hostname}/${randNum}`
    const newUrl = await new Url({original_url:original_url[0],shortened_url});
    newUrl.save()
    const resJson = {original_url:newUrl.original_url,shortened_url:newUrl.shortened_url}
    res.json(resJson)
}

const shortenedUrl = async (req, res) => {
  const {urlId} = req.params;
  const shortened_url  = `${req.protocol}://${req.hostname}/${urlId}`
  await Url.find({shortened_url}, (err, result) => {
    if(err){
      console.log(err)
    } else{
      const url = result.map(url => url.original_url)[0]
      const checkForhttp = new RegExp("^(http||https)://", "i");
      if(checkForhttp.test(url)){
       console.log("http")
        res.redirect(url)
      }else{
        console.log('not http')
        res.redirect(`http://${url}`)
      }
      // res.redirect(301, url)
    }
  })
};

module.exports = { allUrl, urlToShort, shortenedUrl };
