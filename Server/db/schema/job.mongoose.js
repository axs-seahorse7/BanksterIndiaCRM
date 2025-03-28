import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobTitle:String,
    totalVacancies:Number,
    mobileNo:Number,
    location:{
        country:String,
        state:String,
        city:String,
        zip:Number
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client'
    },
    candidateCvs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate'
    },
    publishDate:Date,
    validDate:Date,
    industry:String,
    jobType:String,
    maxExperience:Number,
    minSalary:Number,
    maxSalary:Number,
    description:String,
    requireDiscription:String,
    files:String,
    open:{ 
        type:Boolean,
        default:false
    }

})

const jobsModel = mongoose.model('Jobs', jobSchema )

export default jobsModel