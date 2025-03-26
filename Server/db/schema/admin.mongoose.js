import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    role:String,
    name:String,
    email:String,
    password:String,
})

const admin = mongoose.model('Admin', adminSchema)

export default admin