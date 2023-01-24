const {register,loginmiddleWare,login,resetpassword} = require("./controllers");

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",loginmiddleWare,login);
authRouter.post("/resetPassword",loginmiddleWare, resetpassword);

module.exports={authRouter};