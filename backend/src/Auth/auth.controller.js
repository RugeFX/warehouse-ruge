const express = require("express")
const multer = require('multer')
const { loginSchema } = require("../Validation/validation");
const { getUser, getRefreshToken, createToken, deleteRefreshToken } = require("./auth.service");
const jwt = require("jsonwebtoken");  
const prisma = require("../db");
const jwtValidation = require("../middleware/jwtValidation");

const router = express.Router();

router.use(multer().none())

router.post('/login',async (req,res)=>{
    try{
        const {username,password} = req.body
        await loginSchema.validateAsync({username:username,password:password})
        const user = await getUser(username,password)
        const payload = {
            id:user.id,
            username:user.username,
            staffId:user.staffId,
        }
        const token = createToken(payload)
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
            return res.status(400).json({
                message:"No Token Provided"
            })
        }
        await getRefreshToken(refreshToken)

        const decode = jwt.verify(refreshToken,process.env.SECRET_SERVER)
        const {id,username,staffId} = decode
        const token = createToken({id,username,staffId})

        return res.status(200).json({
            message:"Success",
            token:token
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message || 'Unexpected error',
          });
    }
})

router.delete('/logout',jwtValidation,async(req,res)=>{
    try{
        const {refreshToken} = req.body
        if(!refreshToken){
            return res.status(400).json({
                message:"No Token Provided"
            })
        }
        await deleteRefreshToken(refreshToken)

        return res.status(200).json({
            message:"Success"
        })
    }catch(error){
        res.status(400).json({
            error: error.message || 'Unexpected error',
          });
    }
})

module.exports = router;