import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo db connected")
    } catch (error) {
        console.log("Mongo db not connected")
        
    }
}