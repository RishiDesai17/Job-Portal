const Job = require('../models/jobs');
const Employer = require('../models/employers');
const User = require("../models/users");

exports.getAllJobs = async(req,res) => {
    try{
        let pageNo = parseInt(req.query.pageno)
        // let size = parseInt(req.query.size)
        let size = 10
        let query = {}
        query.skip = size * (pageNo - 1)
        query.limit = size
        const count = await Job.countDocuments();
        const jobs = await Job.find({}, {}, query).select(['title', 'domain', 'employer', 'salary', 'applicationDeadline']).populate('employer', 'name logo').populate('domain');
        let pages = Math.ceil(count / size)
        return res.status(200).json({
            jobs,
            pages,
            count
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.getJobsByDomain = async(req,res) => {
    try{
        const jobs = await Job.find({ domain: req.params.domain }).populate('employer', 'name logo')
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

exports.getJob = async(req,res) => {
    try{
        const job = await Job.findById(req.params.jobid)
        return res.status(200).json({
            job
        })
    }
    catch(err){
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.createJob = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { title, positions, salary, description, domain, perks, skills, applicationDeadline } = req.body
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
            domain,
            perks,
            skills,
            applicationDeadline
        }).save()
        const employee = await Employer.findByIdAndUpdate(req.userData.id, {
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

exports.apply = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { jobID } = req.body
        if(role !== "user"){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        const response = await Promise.all([
            Job.findByIdAndUpdate(jobID, {
                $push: { "applicants": id }
            }),
            User.findByIdAndUpdate(id, {
                $push: { "jobsApplied": jobID }
            })
        ])
        return res.status(200).json({
            job: response[0]
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.shortlist = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { jobID, userID } = req.body
        if(role !== "employer"){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        // const job = await Job.findById(jobID)
        // if(employer.)
        const response = await Promise.all([
            Job.findByIdAndUpdate(jobID, {
                $push: { "shortlisted": userID },
                $pull: { "applicants": userID }
            }),
            User.findByIdAndUpdate(userID, {
                $push: { "jobsShortlisted": jobID },
                $pull: { "jobsApplied": jobID }
            })
        ])
        return res.status(200).json({
            message: "Successfully shortlisted"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.select = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { jobID, userID } = req.body
        if(role !== "employer"){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        const job = await Job.findById(jobID)
        if(job.selected.length === job.postions){
            return res.status(403).json({
                FORBIDDEN: "You cant't select number of candidates more than number of positions available"
            })
        }
        const response = await Promise.all([
            Job.findByIdAndUpdate(jobID, {
                $push: { "shortlisted": userID },
                $pull: { "applicants": userID }
            }),
            User.findByIdAndUpdate(userID, {
                $push: { "jobsShortlisted": jobID },
                $pull: { "jobsApplied": jobID }
            })
        ])
        return res.status(200).json({
            message: "Successfully shortlisted"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}