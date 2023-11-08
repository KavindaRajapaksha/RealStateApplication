const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


const userRoute = require('./routes/userRoute.js');
app.use('/api/user',userRoute);
const residencyRoute = require('./routes/residencyRoute.js');
app.use('/api/residency',residencyRoute);


