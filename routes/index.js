const express = require("express");
const router = express.Router();

router.get("/pink",(req,res)=>{
    res.send("Hello from task")
})

module.exports= router;