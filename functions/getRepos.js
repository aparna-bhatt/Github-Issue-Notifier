const axios = require("axios");
const async = require("async");

function getRepos(username) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/users/${username}/repos?type=forks`, {
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("in get");
        reject({ err: true, sucess: false, data: err });
      });
  });
}

module.exports={getRepos};
