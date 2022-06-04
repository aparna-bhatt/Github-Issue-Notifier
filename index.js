const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require("axios");
const async = require("async");
var cron = require("node-cron");
const mongoose = require("mongoose");
const User = require("./models/users");
const Repos = require("./models/repos");
// const fetch = require("node-fetch");
const { ObjectId } = require("mongodb");
const { reject } = require("lodash");
const res = require("express/lib/response");
const { replaceOne } = require("./models/users");
const Logger = require("nodemon/lib/utils/log");
const nodemailer = require("nodemailer");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { getRepos } = require("./functions/getRepos");
const { getInfo } = require("./functions/getInfo");
const {email}=require("./functions/email");
const path=require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
// app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //  to use public directory in ejs

app.get("/", (req, res) => {
  res.render("pages/index.ejs",{
    message:"",
    error:"",
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const url =process.env.URL;
mongoose.connect(url,{ useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", function () {
  console.log("connected"); //for storing the users github username and email address for sending them email to the preffered id
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//now i have to set a time for every 3 hours to post a get request for our users and to get the parent issues from data base and compare it with the current
//if there has been increase in the issue cnt then send mail reagrding the repo and tell the user that a new issue has been raised pleas check it

// setInterval(() => {
//   console.log("int set"
//   );
//   email();

// }, 1000 * 60*2);

//post request
const postRequest = require("./routers/post");
app.use("/", postRequest);
//////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}....`);
});
