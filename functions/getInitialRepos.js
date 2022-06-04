const axios = require("axios");
const async = require("async");
const {getInitialReposInfo}=require("./getInitialReposInfo");

function getInitialRepos(username) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/users/${username}/repos?q=type:forks`, {
      })
      .then((res) => {
        const result2 = getInitialReposInfo(username, res.data);
        result2
          .then(function (reposInfo) {
            resolve(reposInfo);
          })
          .catch((err) => {
            reject({ err: true, success: false, data: err });
          });
      })
      .catch((err) => {
        reject({ err: true, sucess: false, data: err });
      });
  });
}

module.exports={getInitialRepos};
