const express = require("express")
const multer = require('multer')
const { loginSchema } = require("../Validation/validation");
const { getUser } = require("./auth.service");
const jwt = require("jsonwebtoken");  
const prisma = require("../db");

const router = express.Router();

router.post('/login',multer().none(),async (req,res)=>{
    try{
        const {username,password} = req.body
        await loginSchema.validateAsync({username:username,password:password})
        const user = await getUser(username,password)
        const payload = {
            id:user.id,
            username:user.username,
            password:user.password,
            staffId:user.staffId,
        }
        const token = jwt.sign(payload,process.env.SECRET_SERVER,{expiresIn:"15s"})
        const refreshtoken = jwt.sign(payload,process.env.SECRET_SERVER,{expiresIn:"7d"})

        const expireAt = new Date(Date.now()+7)
        expireAt.setDate(expireAt.getDate()+7)
        
        await prisma.refreshToken.create({
            data:{
                token:refreshtoken,
                expireAt:expireAt
            }
        })
        res.json({
            message: 'Login successful',
            user: user,
            token:token,
            refreshtoken:refreshtoken
          });
    }
    catch(error){
        res.status(400).json({
            error: error.message || 'Unexpected error',
          });
    }

})

router.post("/token",async(req,res)=>{
    try{
        const {refreshToken} = req.body
        if(!refreshToken){
            
        }
    }catch(err){

    }
})

module.exports = router;