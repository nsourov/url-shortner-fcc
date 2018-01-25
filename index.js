require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require('./router/router')

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000, () => console.log("Server running"));
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI,
    () => console.log("DB Running")
);

app.use('/', router)
