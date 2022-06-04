const {getInfo}=require("./getInfo");

function getInitialReposInfo(username, info) {
  return new Promise((resolve, reject) => {
    var len = 0;
    var arr = [];
    info.forEach((repo) => {
      if (repo.fork == true) len++;
    });
    info.forEach((repo) => {
      if (repo.fork == true) {
        const repoName = repo.name;
        const result = getInfo(username, repoName);
        result
          .then(function (ele) {
            arr.push({ repoName: repo.name, issues: ele });
            if (arr.length == len) resolve(arr);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

module.exports={getInitialReposInfo};
