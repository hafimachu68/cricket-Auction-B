const mongoose=require('mongoose')
const connectDb= async()=>{

     try { 
        const connection=await mongoose.connect('mongodb+srv://hafee3155:4viL0jzJBmyVmBJF@cluster0.qlem9ku.mongodb.net/',{
            useNewUrlParser:'true'
        })
        console.log("Mongodb connected");
        
     } catch (error) {
        console.log("not connected");require('dotenv').config(); // Load environment variables from .env file
     }
    }

module.exports=connectDb  