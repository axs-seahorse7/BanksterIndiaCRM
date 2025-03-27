import express, {Router} from "express";
import clientModel from "../db/schema/client.mongoose.js";
import jobsModel from "../db/schema/job.mongoose.js";

const router = express.Router()

router.post('/create-client', async (req, res)=>{
    try {
        const { 
            clientName,
            mobileNo,
            websiteLink,
            industry,
            source,
            about,
            billingAddress,
            shipAddress 
        } = req.body


        const client = new clientModel({
            clientName,
            mobileNo,
            websiteLink,
            industry,
            source,
            about,
            billingAddress,
            shipAddress,
        })

        await client.save()
        return res.json({success: true, message:"client created"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Server Error'})
        
    }

})
router.post('/create-position', async (req, res)=>{
    try {
       const { 
        jobTitle,
        totalVacancies,
        mobileNo,
        location,
        publishDate,
        validDate,
        industry,
        jobType,
        maxExperience,
        minSalary,
        maxSalary,
        description,
        requireDiscription,
        
        } = req.body

    console.log(req.body)
    


        const client = new jobsModel({
            jobTitle,
            totalVacancies,
            mobileNo: Number(mobileNo),
            location,
            publishDate,
            validDate,
            industry,
            jobType,
            maxExperience: Number(maxExperience),
            minSalary:Number(minSalary),
            maxSalary:Number(maxSalary),
            description,
            requireDiscription,
        })

        await client.save()
        return res.json({success: true, message:"client created"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Server Error'})
        
    }

})


export default router