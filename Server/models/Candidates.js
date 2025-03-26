const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
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
    resume: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);