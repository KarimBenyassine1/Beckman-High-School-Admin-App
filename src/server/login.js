const express = require('express')
const router = express.Router()
const Log=require('./Log')
const mongoose=require('mongoose')

router.get('/', (req,res)=>{
    res.send("hello info");
})

router.post('/', async (req,res)=>{
    const log = new Log({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    })
    try{
    const savedlog= await log.save();
    res.json(savedlog)
    }catch(err){
        res.json({message: err})
    }

})


module.exports=router;