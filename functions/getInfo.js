const axios = require("axios");
const async = require("async");

function getInfo(username, repoName) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/repos/${username}/${repoName}`, {
      })
      .then((res) => {
        const originalName=res.data.parent.full_name;
        axios
        .get(`https://api.github.com/search/issues?q=repo:${originalName} type:issue state:open`)
        .then((issues)=>{
          resolve(issues.data.total_count);
        }).catch((err)=>{
          reject({ err: true, success: false, data: err });
        })
      })
      .catch((err) => {
        reject({ err: true, success: false, data: err });
      });
  });
}

module.exports={getInfo};
