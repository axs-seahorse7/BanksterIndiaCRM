import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:String,
    mobileNo:Number,
    email:String,
    location:{
        country:String,
        state:String,
        city:String,
        zip:Number
    },
    education:[{
        collageName:String,
        degree:String,
        startDate:Date,
        endDate:Date,
    }],
    companyDetails:{
        companyName:String,
        designation:String,
        product:String,
        websiteLink:String,
        experience:Number,
        currentSalary:Number,
        expectedSalary:Number,
        startDate:Date,
        endDate:Date,
    },
    pastCompanyDetails:[{
        pastCompany:String,
        designation:String,
        product:String,
        experience:Number,
        salary:Number,
    }],
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
    resume:String,
    password:String,

})

const candidateModel = mongoose.model('Candidate', candidateSchema )

export default candidateModel