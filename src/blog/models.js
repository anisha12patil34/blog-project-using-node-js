const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: String,
  desription: String,
  user_id:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
},{timestamp:true});

const blog = mongoose.model("Blog", BlogSchema);
module.exports={blog};