const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        // required:true
    }
});

module.exports=mongoose.model("User",userSchema);