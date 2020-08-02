const Employer = require('../models/employers');
const Job = require('../models/jobs');

exports.createJob = async(req,res) => {
    try{
        const { id, role } = req.userData
        const { title, positions, salary, description, perks, skills, applicationDeadline } = req.body
        if(role !== 'employer'){
            return res.status(401).json({
                message: 'Unauthorized'
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
    }
    catch(err){
        console.log(err)

    }
}