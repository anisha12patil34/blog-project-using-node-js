const express = require("express");
const blogRouter = express.Router();
const {createNewBlog,getBlogs} = require("./controllers");
const isAuthenticate = require("../helper/utils");

blogRouter
.route("/blog")
.post(isAuthenticate,createNewBlog)
.get(isAuthenticate, getBlogs)
module.exports = blogRouter;