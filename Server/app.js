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
app.use(bodyParser.urlencoded({ extends: true }))

app.use("/auth", authRoutes);
app.use("/api", index);

router.post('/candidates', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a candidate by ID
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

app.get('/data', (req, res) => {
    res.send(' router here')
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
