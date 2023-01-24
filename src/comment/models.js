const mongoose = require("mongoose");


 const commengSchema = new mongoose.Schema({
    blogId : {type:mongoose.Types.ObjectId, ref:"Blog"},
    comment:String,
    userId : {type:mongoose.Types.ObjectId, ref:"User"}
 },{timestamps:true});

 const comment = ("Comment", commengSchema);
 module.exports={comment};