import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection/mongoose.config.js";
import authRoutes from "./routes/authRoutes.js";
import index from './routes/index.js'
import bodyParser from "body-parser";
import Candidate from './models/Candidates.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const router = express.Router();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}))

app.use("/auth", authRoutes);
app.use("/api", index);
app.use("/", router)

router.get('/test', (req, res)=>{
    res.send('testing router is working...')
})

router.post('/candidates', async (req, res) => {
    try {
        const mobileNo = Number(req.body.mobileNo);

        if (isNaN(mobileNo) || mobileNo.toString().length !== 10 ) {
        return res.status(400).json({ message: "Invalid mobile number" });
        }
        const email = req.body.email;

        const isExist = await Candidate.findOne({mobileNo})
        const isExistEmail = await Candidate.findOne({email})

        if(isExist || isExistEmail){
        return res.status(409).json({message:'Candidate already exist'})
        }
        
        if(!req.body){
        return res.status(401).json({message:"all fields are required"})
        }

        const candidate = new Candidate({...req.body, mobileNo});
        await candidate.save();

       return res.status(201).json({message:"Candidate Created", success:true, candidate});
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ error: error.message });
    }

});

//update candidate by id
router.put('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

// Delete a candidate by ID
router.delete('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/fetch-candidate", async (req, res) => {
    try {
        let { limit, skip, ...query } = req.query;

        // Convert limit & skip to numbers
        const intLimit = Number(limit) || 10; 
        const intSkip = Number(skip) || 0;

        let filterQuery = {};
        let hasFilters = false;

        Object.keys(query).forEach((key) => {
            if (query[key] === "true") {
                filterQuery[key] = true;
                hasFilters = true;
            }
            if (query[key] === "false") {
                filterQuery[key] = false;
            }
        });


        let candidates;
        if (hasFilters) {
            candidates = await Candidate.find(filterQuery)
                .limit(intLimit)
                .skip(intSkip);
        } else {
            candidates = await Candidate.find({})
                .sort({ createdAt: -1 }) 
                .limit(intLimit);
        }

        const totalCandidateDocs = await Candidate.countDocuments(filterQuery);

        res.json({ candidates, totalCandidates: totalCandidateDocs });
        
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.get('/data', (req, res) => {
    res.send(' router here')
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
