const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const{authRouter} = require("./src/auth/router");
const { blog } = require("./src/blog/models");
const blogRouter = require("./src/blog/router");

const app = express();

//database connection
mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on("connected",()=>{
    console.log("Database connected with blog");
});


//middlewares
app.use(cors());
app.use(bodyParser.json());


app.use("/auth",authRouter);
app.use("/blog", blogRouter);

app.listen(4000,()=>{
    console.log("server is started on port 4000");
})