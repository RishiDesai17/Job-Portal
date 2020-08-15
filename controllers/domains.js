const Job = require('../models/jobs');
const Domain = require('../models/domain')

exports.getDomains = async(req,res) => {
    try{
        const domains = await Domain.find();
        return res.status(200).json({
            domains
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.newDomain = async(req,res) => {
    try{
        if(req.userData.role !== "employer"){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        const domain = await new Domain({
            domain: req.body.domain
        }).save()
        return res.status(201).json({
            domain
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.editDomain = async(req,res) => {
    try{
        if(req.userData.role !== "admin"){
            return res.status(401).json({
                UNAUTHORIZED: 'You are not allowed to perform this action'
            })
        }
        const domain = await Domain.findByIdAndUpdate(req.params.domain, {
            "domain": req.body.newName
        })
        return res.status(200).json({
            domain
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}