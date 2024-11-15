const express=require('express');
const User=require('../db/Schema');
const {z}=require('zod');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const JwtKey=process.env.JwtKey;

const router=express.Router();

const InputSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8),
    username:z.string().optional()
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const IsValidInput=InputSchema.safeParse({email,password});
    if(!IsValidInput.success){
        return res.status(400).json({errors:IsValidInput.error.issues});
    }
    try{
        const user=await User.findOne({email,password});
        
        if(!user){
            return res.status(400).json({message:'Invalid email or Password'});
        }
        const UserId=user._id;
        const token=jwt.sign({UserId},JwtKey)
        res.status(200).json({msg:'Login Successfull',token:token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'server error'});
    }
})

router.post('createUser',async(req,res)=>{
    const {username,email,password}=req.body;
    const IsValidInput=InputSchema.safeParse({email,password,username}); //checking validation of inputs
    if(!IsValidInput.success){
        return res.status(400).json({message:IsValidInput.error.issues});
    }

    //Create A User in Database
    try{
        const user=await User.createOne({
            username,
            email,
            password
        })
        
        const UserId=user._id;
        const token=jwt.sign({UserId},JwtKey)
        res.status(200).json({message:'User Created Successfully',token:token});
    }catch(error){
        return res.status(500).json({message:'Server Error'});
    }
})

module.exports=router;