import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName:String,
    mobileNo:String,
    websiteLink:String,
    industry:String,
    source:String,
    about:String,
    billingAddress:{
        country:String,
        state:String,
        city:String,
        zip:Number,
        street:String,
    },
    shipAddress:{
        country:String,
        state:String,
        city:String,
        zip:Number,
        street:String,
    },
    files:[{
        document:String,
    }],

})

const clientModel = mongoose.model('Client', clientSchema)
export default clientModel