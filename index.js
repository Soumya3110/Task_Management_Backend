const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const dotenv = require("dotenv")
const cors = require("cors");
const fs = require("fs");
const {incomingRequestLogger}=require("./middleware/index.js");
const indexRouter =require("./routes/index.js")
const userRouter=require("./routes/user.js")
const taskRouter=require("./routes/task.js")
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const { mongo } = require("mongoose");
const urlencoded = require("body-parser/lib/types/urlencoded.js");
const { header } = require("express-validator");
app.use(bodyParser.urlencoded({extended:true}));
app.use(incomingRequestLogger);
app.use("/api/manage", indexRouter);
app.use("/api/manage/user", userRouter);
app.use("/api/manage/task", taskRouter);

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 3000");
    mongoose.connect(process.env.MONGOOSE_URL_STRING,{
    
    });
    mongoose.connection.on("error",(err)=>{
        console.log(err);
    });
})
