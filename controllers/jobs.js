const Employer = require('../models/employers');
const Job = require('../models/jobs');

exports.getAllJobs = async(req,res) => {
    try{
        const jobs = await Job.find().populate('Employer').populate('Domain')
        return res.status(200).json({
            jobs
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.createJob = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { title, positions, salary, description, perks, skills, applicationDeadline } = req.body
        if(role !== 'employer'){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        const job = await new Job({
            title,
            employer: id,
            positions, 
            salary, 
            description, 
            perks,
            skills,
            applicationDeadline
        }).save()
        const emp = await Employer.findByIdAndUpdate(req.userData.id, {
            $push: { 'jobs': job._id }
        })
        return res.status(201).json({
            job
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}