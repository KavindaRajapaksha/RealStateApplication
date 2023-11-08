const asyncHandler = require('express-async-handler');
const { prisma } = require('../config/prismaconfig.js');

const createUser = asyncHandler(async(req,res)=>{
console.log("createing a user");
const {email}=req.body;
 const userExists = await prisma.user.findUnique({
     where:{
         email:email
     }
 })
 if(!userExists){
     const user = await prisma.user.create({
         data:req.body}
     );
     res.send({
        message:"User registerd successfully",
        user:user
     });

     
 }else
 res.status(201).send({messsage:"User already exists"});



});
module.exports = { createUser };