const mongoose=require('mongoose')
const connectDb= async()=>{

     try { 
        const connection=await mongoose.connect('mongodb+srv://hafee3155:4viL0jzJBmyVmBJF@cluster0.qlem9ku.mongodb.net/',{
            useNewUrlParser:'true'
        })
        console.log("Mongodb connected");
        
     } catch (error) {
        console.log("not connected");require('dotenv').config(); // Load environment variables from .env file
        const mongoose = require('mongoose');
        const MONGODB_URI = process.env.MONGODB_URI;
        
        const connectDb = async () => {
            try { 
                const connection = await mongoose.connect(MONGODB_URI, {
                    useNewUrlParser: true
                });
                console.log("MongoDB connected");
            } catch (error) {
                console.error("Failed to connect to MongoDB:", error.message);
            }
        } 
        
        module.exports = connectDb;
          
        
        
     }
}
module.exports=connectDb  