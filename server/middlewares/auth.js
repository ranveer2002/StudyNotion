const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req,res,next) => {
    try{
        console.log("in middleware");
        //fetch token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        //if token miss
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid'
            })
        }
        next();
    } catch(error){
      return res.status(401).json({
        success:false,
        message:'Something went wrong while validating the Token',
      })
    }
}

//isStudent

exports.isStudent = async(req,res,next) => {
    try{
        console.log("in student middleware");
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is the protected route for students only',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not verified, please try again',
          })
    }
}


//isInstructor

exports.isInstructor = async(req,res,next) => {
    try{
        console.log("in instructor middleware");
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'This is the protected route for instructor only',
            })
        }
        next();
        console.log("outside from instrucotr middleware")
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not verified, please try again',
          })
    }
}

//isAdmin

exports.isAdmin = async(req,res,next) => {
    try{
        console.log("in admin middleware");
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is the protected route for admin only',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role is not verified, please try again',
          })
    }
}