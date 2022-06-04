const mongoose=require("mongoose");

const repoSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    repoInfo:[
        {
            repoName:{
                type:String,
                required:true
            },
            openIssues:{
                type:Number,
                required:true,
                default:0
            }
        }
    ]
});

module.exports=mongoose.model("Repos",repoSchema);