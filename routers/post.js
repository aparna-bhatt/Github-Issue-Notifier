const express = require("express");
const router = express.Router();
const { getInitialRepos } = require("../functions/getInitialRepos");
const User = require("../models/users");
const Repos = require("../models/repos");

router.post("/", (req, res) => {
  let message = `You are registered!`;
  let text = `You will be notified if new issues appear in you forked Repo!`;
  const username = req.body.username;
  const email = req.body.email;
  console.log(username);
  console.log(email);
  User.find({ username: username }, (error, rest) => {//first error comes and then data
    if (error) {
      res.render("pages/index.ejs", {
        message:null,
        error: "server error try sometime later",
      });
    } else if (rest.length !== 0) {
      console.log(rest,"o");
      res.render("pages/index.ejs", {
        message: "This username is already registered!",
        error:null
      });
    } else {
      const newUser = new User({
        username: username,
        email_id: email,
      });
      const newUserRepo = new Repos({
        username: username,
        email_id: email,
      });
      //post request to github api to get the initial repos and store it in database
      const response = getInitialRepos(username);
      console.log(response.config);
      response
        .then((reposInfo) => {
          console.log(reposInfo,"df,m");
          reposInfo.forEach((repo) => {
            newUserRepo.repoInfo.push({
              repoName: repo.repoName,
              openIssues: repo.issues,
            });
          });
          newUser.save();
          newUserRepo.save();
          res.render("pages/index.ejs", {
            message: "You are registered!",
            error:null
          });
        })
        .catch((err) => {
          console.log(err,"rr");
          res.render("pages/index.ejs", {
            message:null,
            error: "server error try sometime later",
          });
        });
    }
  });
});

module.exports = router;
