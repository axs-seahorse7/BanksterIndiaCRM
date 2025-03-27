import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    location: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
    },
    education: [
        {
            collegeName: { type: String, required: true },
            degree: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
        },
    ],
    companyDetails: {
        companyName: { type: String, required: true },
        designation: { type: String, required: true },
        product: { type: String, required: true },
        websiteLink: { type: String },
        experience: { type: String, required: true },
        currentSalary: { type: String, required: true },
        expectedSalary: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
    },
    pastCompanyDetails: [
        {
            pastCompany: { type: String, required: true },
            designation: { type: String, required: true },
            product: { type: String, required: true },
            experience: { type: String, required: true },
            salary: { type: String, required: true },
        },
    ],
    status:{
        hold:{
            type:Boolean,
            default:false
        },
        rejected:{
            type:Boolean,
            default:false
        },
        duplicate:{
            type:Boolean,
            default:false
        },
        active:{
            type:Boolean,
            default:false
        },
        close:{
            type:Boolean,
            default:false
        },
        
    },
    
    resume: { type: String},
}, { timestamps: true });

const candidate = mongoose.model('Candidate', candidateSchema);

export default candidate