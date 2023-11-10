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

const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;
  
    try {
      const alreadyBooked = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });
  
      if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
        res
          .status(400)
          .json({ message: "This residency is already booked by you" });
      } else {
        await prisma.user.update({
          where: { email: email },
          data: {
            bookedVisits: { push: { id, date } },
          },
        });
        res.send("your visit is booked successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

const allBookings = asyncHandler(async(req,res)=>{
 const {email}=req.body;
 try{
    const bookings=await prisma.user.findUnique({
        where:{email},
        select:{bookedVisits:true}

 });
 res.status(200).send(bookings)
}
 catch(err){
     throw new Error(err.message);
 }

});
const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { bookedVisits: true },
      });
  
      const index = user.bookedVisits.findIndex((visit) => visit.id === id);
  
      if (index === -1) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        user.bookedVisits.splice(index, 1);
        await prisma.user.update({
          where: { email },
          data: {
            bookedVisits: user.bookedVisits,
          },
        });
  
        res.send("Booking cancelled successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      
      const favResidenciesID = user.favResidenciesiD || [];
  
      if (favResidenciesID.includes(rid)) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesiD: {
              set: favResidenciesID.filter((id) => id !== rid),
            },
          },
        });
  
        res.send({ message: "Removed from favorites", user: updateUser });
      } else {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesiD: [...favResidenciesID, rid], // Use spread operator to add rid to the array
          },
        });
        res.send({ message: "Updated favorites", user: updateUser });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });
  
  
    const allFav = asyncHandler(async (req, res) => {
      const {email}=req.body;
      try{
        const favResd=await prisma.user.findUnique({
            where:{email},
            select:{favResidenciesiD:true}
      });
      res.status(200).send(favResd)
    }catch(err){
      throw new Error(err.message)};




    });





module.exports = { createUser,bookVisit,allBookings,cancelBooking,toFav,allFav };