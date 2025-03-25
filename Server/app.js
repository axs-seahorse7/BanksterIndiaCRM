import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./db/connection/mongoose.config.js";

dotenv.config()
connectDB()
const app = express()

const corsOptions = {
    origin: ["http://localhost:5173", "https://yourfrontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
};
app.use(cors(corsOptions))

app.get("/", (req, res)=>{
    res.send('server start')
})

app.listen(4000, ()=>{
    console.log('server start')
})