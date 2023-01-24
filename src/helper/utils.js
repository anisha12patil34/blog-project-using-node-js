const jwt = require("jsonwebtoken");
const {key} = require("../auth/controllers");
const {user} = require("../auth/models");

const isAuthenticate = async(req,res,next)=>{
    var token = req.headers.authorization;
    if(!token){
        return res.json({status: "error", message: "token required"});
    }
     
try{
    var user = jwt.verify(token,key);
    if(user && user._id){
        user = await user.findById(user._id);
        if(!user){
         return res.json({status: "error", message: "invalid user"});
        }
        req.body.user_id = user._id;
        req.user = user;
        next();
    }else{
        return res.json({status:"Error", message:"Invalid Token"});
    }
     }catch{
        return res.json({status: "error", message: "Invalid token"});
     }
};
module.exports = isAuthenticate;