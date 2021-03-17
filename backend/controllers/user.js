import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const exisitingUser = await User.findOne({email});
        if(!exisitingUser) return res.status(404).json({message:"user doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,exisitingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"invalid credentials"});

        const token = jwt.sign({email:exisitingUser.email,id:exisitingUser._id},"test",{expiresIn:"1h"});

        res.status(200).json({result:exisitingUser,token});
    }
    catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}

export const signup = async(req,res)=>{
    const { firstName,lastName,email,password,confirmPassword } = req.body;

    try{
        const exisitingUser = await User.findOne({email});

        if(exisitingUser) return res.status(400).json({message:"user already exist"});

        if(password !== confirmPassword) return res.status(400).json({message:"password doesn't match"});
        
        const hashPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"});

        res.status(200).json({result,token});
        
    }
    catch(err){
        res.status(500).json({message:"something went wrong"});
    }
}