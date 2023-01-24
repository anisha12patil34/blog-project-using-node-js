const jsonWebToken = require("jsonwebtoken");
const {user} = require("./models");
const key = "jibe9ufbevuei";

const register=  async(req,res)=>{
    console.log(req.body);
    const{name,username,email,password} = req.body;
    if(!username||!password||!email){
        return res.send("Please enter Username ans Password")
    }
    //var isExists = await user.findOne(
    //    $or:[{username:req.body.username},{email:req.body.email}]
    //)
    var UserExists = await user.findOne({ username: username });
    var emailExists = await user.findOne({ email: email });
    if (UserExists || emailExists) {
      return res.send("User or Username already Exists");
    }
    var Newuser = await user.create(req.body);
    Newuser.ency_password = undefined;
    Newuser.salt = undefined;
    return res.json({ status: "Registration Successfull", user: Newuser });
  };

  const loginmiddleWare = async(req,res,next)=>{
    const {username,password} = req.body;
    if(!username||!password){
        return res.send("Username and Password required");
    }
    const UserExists = await user.findOne({username: username});
    if(!UserExists){
        return res.json({status: "You entered wrong Username"});
    }
    if(!UserExists.isAuthenticate(password)){
        return res.json({status: "you entered wrong password"});
    }

    var token = jsonWebToken.sign({_id:UserExists._id},key );
    req.body.user = token;
    next();
}
    
    const login =  async(req,res)=>{
        return res.json({status:"logged in succesfully", token: req.body.token});
     };
    
    const resetpassword =  async(req,res)=>{
        var UserExists = await user.findOne({username:req.body.username});
        UserExists.password = req.body.newPassword;
        await UserExists.save();
        return res.json({status:"Reset Succesfully", user});
    };

    module.exports={register,loginmiddleWare,login,resetpassword,key};

