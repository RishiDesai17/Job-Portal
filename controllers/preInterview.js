const Job = require('../models/jobs');
const PreInterview = require("../models/preInterview");
const Question = require("../models/question");

exports.createInterview = async(req, res) => {
    try{
        const { deadline, questions, jobID } = req.body
        const preInterview = await new PreInterview({
            deadline,
            questions
        }).save();
        await Promise.all([...questions.map(question => {
            await new Question({
                ...question,
                preinterview: preInterview._id
            }).save()
        }), linkPreInterviewToJob(preInterview._id, jobID)])
        return res.status(200).json({
            message: 'Pre Interview Created'
        })
    } 
    catch(error){
        console.log(error)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

const linkPreInterviewToJob = async(preInterviewID, jobID) => {
    try{
        await Job.findByIdAndUpdate(jobID, {
            'preInterview': preInterviewID
        })
    }
    catch(error){
        console.log(error)
    }
}