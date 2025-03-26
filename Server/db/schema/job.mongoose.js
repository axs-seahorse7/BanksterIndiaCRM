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
    jobOpenStatus:{
        hold:{
            type:Boolean,
            default:false,
        },
        progress:{
            type:Boolean,
            default:false,
        },
        waiting:{
            type:Boolean,
            default:false
        },
    },

})

const jobsModel = mongoose.model('Jobs', jobSchema )

export default jobsModel