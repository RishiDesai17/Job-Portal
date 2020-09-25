const Job = require('../models/jobs');
const User = require("../models/users");
const PreInterview = require("../models/preInterview");
const Question = require("../models/question");

exports.createInterview = (req, res) => {
    try{
        const { deadline, questions } = req.body
        const preInterview = await new PreInterview({
            deadline,
            questions
        }).save();
        await Promise.all(questions.map(question => {
            await new Question({
                ...question,
                preinterview: preInterview._id
            }).save()
        }))
    } 
    catch(error){
        console.log(error)

    }
}