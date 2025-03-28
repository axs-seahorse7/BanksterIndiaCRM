import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection/mongoose.config.js";
import authRoutes from "./routes/authRoutes.js";
import index from './routes/index.js'
import bodyParser from "body-parser";
import Candidate from './models/Candidates.js';
import clientModel from "./db/schema/client.mongoose.js";
import jobsModel from "./db/schema/job.mongoose.js";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const router = express.Router();

const uploadDir = path.join("uploads/resumes");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `resume_${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and Word documents are allowed"));
        }
    }
});

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/uploads/resumes", express.static(uploadDir));

app.use("/auth", authRoutes);
app.use("/api", index);
app.use("/", router)

router.get('/test', (req, res) => {
    res.send('testing router is working...')
})

router.post('/candidates', upload.single('resume'), async (req, res) => {
    try {
        console.log("req.body", req.body);
        console.log("req.file", req.file);

        // Convert mobileNo to Number
        const mobileNo = Number(req.body.mobileNo);
        console.log("mobileNo", mobileNo);
        if (isNaN(mobileNo) || mobileNo.toString().length !== 10) {
            return res.status(400).json({ message: "Invalid mobile number" });
        }

        const email = req.body.email;
        const isExist = await Candidate.findOne({ mobileNo });
        const isExistEmail = await Candidate.findOne({ email });

        if (isExist || isExistEmail) {
            return res.status(409).json({ message: 'Candidate already exists' });
        }

        if (!req.body) {
            return res.status(401).json({ message: "All fields are required" });
        }

        // Parse JSON fields sent from frontend as strings
        const candidateData = { ...req.body };
        const parseFields = ["education", "pastCompanyDetails", "companyDetails", "location"];

        for (const field of parseFields) {
            if (candidateData[field] && candidateData[field] !== "undefined") {
                try {
                    candidateData[field] = JSON.parse(candidateData[field]);
                } catch (error) {
                    return res.status(400).json({ message: `Invalid JSON format in ${field}` });
                }
            } else {
                candidateData[field] = field === "pastCompanyDetails" ? [] : {}; // Set a default value if undefined
            }
        }

        // Save the file path in the database
        const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

        // Create new candidate
        const candidate = new Candidate({
            ...candidateData,
            mobileNo,
            resume: resumePath
        });

        await candidate.save();
        return res.status(201).json({ message: "Candidate Created", success: true, candidate });
    } catch (error) {
        console.log(error.message);
        if (!res.headersSent) { // Prevent multiple responses
            return res.status(400).json({ error: error.message });
        }
    }
});

//update candidate by id
router.put('/candidates/:id', upload.single('resume'), async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.body.education) {
            updateData.education = JSON.parse(req.body.education);
        }

        if (req.body.companyDetails) {
            updateData.companyDetails = JSON.parse(req.body.companyDetails);
        }

        if (req.body.pastCompanyDetails) {
            updateData.pastCompanyDetails = JSON.parse(req.body.pastCompanyDetails);
        }

        if (req.body.location) {
            updateData.location = JSON.parse(req.body.location);
        }

        if (req.file) {
            updateData.resume = `/uploads/resumes/${req.file.filename}`;
        }

        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        return res.status(200).json({ message: "Candidate Updated!", success: true, candidate });
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

        if (candidate.resume) {
            const filePath = path.join("./", candidate.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
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

router.get('/fetch-client', async (req, res) => {
    try {

        const client = await clientModel.find()
        const totalclientDocs = await clientModel.countDocuments()

        res.json({ client, totalClients: totalclientDocs })

    } catch (error) {
        console.log(error.message)
    }

})

router.get('/fetch-position', async (req, res) => {
    try {
        const positions = await jobsModel.find()
        const totalPositionsDocs = await jobsModel.countDocuments()

        res.json({ positions, totalPositions: totalPositionsDocs })

    } catch (error) {
        console.log(error.message)
    }

})


app.get('/data', (req, res) => {
    res.send(' router here')
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
