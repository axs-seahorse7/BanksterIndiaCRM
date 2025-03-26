import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection/mongoose.config.js";
import authRoutes from "./routes/authRoutes.js";
import index from './routes/index.js'
import bodyParser from "body-parser";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extends:true}))

app.use("/auth", authRoutes);
app.use("/api", index);

app.get('/data', (req, res)=>{
    res.send(' router here')
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
