const Job = require('../models/jobs');
const PreInterview = require("../models/preInterview");
const Question = require("../models/question");

exports.createInterview = async(req, res) => {
    try{
        const { deadline, questions, jobID } = req.body
        // console.log(questions)
        // console.log(typeof questions)
        
        const question_ids = await Promise.all(questions.map(async question => {
            const { _id } = await new Question({
                ...question,
            }).save()
            console.log(_id)
            return _id
        }))
        const preInterview = await new PreInterview({
            deadline,
            questions: question_ids
        }).save();
        await Job.findByIdAndUpdate(jobID, {
            'preInterview': preInterview._id
        })
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