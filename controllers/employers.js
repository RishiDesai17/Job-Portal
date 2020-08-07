const bcrypt = require('bcryptjs');
const Employer = require('../models/employers');
// const Job = require('../models/jobs');
const { generateTokens } = require('../utils/token')

exports.login = async(req,res) => {
    try{
        const employer = await Employer.find({ email: req.body.email }).limit(1);
        if(employer.length === 0){
            return res.status(401).json({
                message: 'Authorization failed'
            })
        }
        if(!employer.confirmed){
            return res.json({
                message: "Your account hasn't been approved yet"
            })
        }
        const result = await bcrypt.compare(req.body.password, user[0].password)
        const tokenpair = await generateTokens(employer._id, 'employer')
        return res.status(200).json({
            message: 'Authorization successful',
            employer,
            access_token: tokenpair[0]
        })
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message: 'Authorization failed'
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
        return res.status(200).json({
            message: 'Thank you for choosing us! Our officials will contact you soon to confirm your registration'
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}