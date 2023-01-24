const { default: mongoose } = require("mongoose");
const uuid = require("uuid");
const cryptoJS = require("crypto-js");
const momgoose = require("mongoose");
 const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
    },
    name: String,
    email: String,
    ency_password: String,
    salt:String
 },{}
 );

 userSchema.virtual("password").set(function(planpassword){
   // this.ency_password = password +"helloooww";
   this.salt = uuid.v4();
   this.ency_password = this.securePassword(planpassword);
 });
 userSchema.methods= {
    securePassword:function(planpassword){
        return cryptoJS.SHA256(planpassword,this.salt).toString();
    },

    isAuthenticate : function(planpassword){
        return this.ency_password === this.securePassword(planpassword);
    }
 };

 const user = mongoose.model("User", userSchema);
                            //use in blog username 
 module.exports={user};