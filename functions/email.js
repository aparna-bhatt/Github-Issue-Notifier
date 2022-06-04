const User = require("../models/users");
const Repos = require("../models/repos");
const {getRepos}=require("./getRepos");
const {getInfo}=require("./getInfo");
const {Sendmail}=require("./sendMail");

function email (){

Repos.find({},(err,data)=>{
    console.log("repo");
    if(err)
    {
        console.log(err,"err");
        clearInterval()
    }
    else
    {
        // console.log(data);
        data.forEach(element => {
            const username=element.username;
            const email=element.email_id;
            console.log(username,email);
            const InitialRepoNames=[{}];
            const InitialStoredRepos=element.repoInfo;
            InitialStoredRepos.forEach((repo)=>{
                InitialRepoNames.push({repoName:repo.repoName,openIssues:repo.openIssues});
            });

            const NewRepos=getRepos(username);
            NewRepos.then(repos=>{
                // console.log(repos);
                repos.forEach(repo=>{
                    if(repo.fork===true)
                    {let obj=InitialStoredRepos.find(rep=>rep.repoName===repo.name);
                        if(obj===undefined)
                        {
                        console.log(repo.name,obj,"object");
                        const issue=getInfo(username,repo.name);
                        issue.then(i=>{
                            console.log(i);
                            const info=Repos.updateOne({username:username},{$push:{repoInfo:{repoName:repo.name,openIssues:i}}},false,true);
                            console.log(info,"fdskln");
                            // db.students.updateOne(
                            //     { _id: 1 },
                            //     { $push: { scores: 89 } }
                            //  )

                        }).catch(err=>{
                            console.log(err,"in err");
                            clearInterval();
                        })
                    }
                    else
                    {
                        const issue=getInfo(username,repo.name);
                        issue.then(i=>{
                            if(obj.openIssues<i)
                            {
                                Repos.updateOne({username:username,"repoInfo.repoName":repo.name},{$set:{"repoInfo.$.openIssues":i}});
                                // test:PRIMARY> db.coll.update({userID:1, "solutions.textID":2}, {$set: {"solutions.$.solution": "the new text"}})
                                Sendmail(username, email, repo.name)
                                .then(function (data) {
                                  console.log("sent");
                                })
                                .catch((err) => {
                                  console.log(err, "not sent");
                                });
                            }
                        }).catch(err=>{
                            clearInterval();
                        })
                        
                    }
                }
                })
            

            }).catch(err=>{
                console.log(err);
                clearInterval();
            })
        });
    }
})

}

module.exports={email};