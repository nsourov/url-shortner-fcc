const mongoose = require("mongoose");
const urlToShort = new mongoose.Schema({
    original_url: String,
    shortened_url : String
})

module.exports = mongoose.model('UrlToShort', urlToShort)