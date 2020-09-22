const bcrypt = require('bcryptjs');
const Employer = require('../models/employers');
// const Job = require('../models/jobs');
const { generateTokens } = require('../utils/token')

exports.login = async(req,res) => {
    try{
        const employer = await Employer.find({ email: req.body.email }).select("+password +confirmed").limit(1);
        if(employer.length === 0){
            return res.status(404).json({
                NOT_FOUND: 'This account does not exist'
            })
        }
        let employerData = employer[0]
        console.log(employerData)
        if(!employerData.confirmed){
            return res.status(401).json({
                UNAPPROVED: "Your account hasn't been approved yet"
            })
        }
        const isValid = await bcrypt.compare(req.body.password, employerData.password)
        if(!isValid){
            return res.status(401).json({
                UNAUTHORIZED: 'Invalid credentials'
            })
        }
        employerData.password = undefined
        const tokenpair = await generateTokens(employerData._id, 'employer')
        const dt = new Date()
        res.cookie('job_portal_token', tokenpair[1], {
            httpOnly: true,
            sameSite: true,
            // path: '/refresh',
            expires: new Date(dt.setMonth(dt.getMonth()+6)),
            secure: false
        })
        return res.status(200).json({
            message: 'Authorization successful',
            profile: employerData,
            role: 'employer',
            access_token: tokenpair[0]
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}

exports.register = async(req,res) => {
    try{
        const existingEmployer = await Employer.find({ email: req.body.email }).limit(1)
        if(existingEmployer.length > 0) {
            return res.status(409).json({
                message: "Email already exists"
            })
        }
        const { name, email, password, about, contact_no } = req.body
        const hash = await bcrypt.hash(password, 10)
        const employer = await new Employer({
            name,
            email,
            password: hash,
            about, 
            contact_no
        }).save()
        return res.status(201).json({
            message: 'Thank you for choosing us! Our officials will contact you soon to confirm your registration'
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            SOMETHING_WENT_WRONG: 'Something went wrong, Please try again'
        })
    }
}