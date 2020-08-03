const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Employer = require('../models/employers');

exports.refresh = async(req,res) => {
    try{
        console.log(req.cookies)
        if(!req.cookies.job_portal_token){
            console.log("x")
            return res.status(401).json({
                message: 'Authorization failed'
            })
        }
        const { id, role } = jwt.verify(req.cookies.job_portal_token, process.env.REFRESHTOKENKEY)
        const access_token = jwt.sign({ id, role }, process.env.SECRETKEY, {
            expiresIn: '600s'
        })
        if(req.body.getprofile){
            let profile;
            if(role == 'employer'){
                profile = await Employer.findById(id)
                delete profile.password
            }
            else {
                profile = await User.findById(id)
            }
            if(profile === null){
                return res.json({
                    message: 'Account Not Found'
                })
            }
            return res.status(200).json({
                profile,
                access_token,
                role
            })
        }
        return res.status(200).json({
            access_token
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            message: 'Authorization failed'
        })
    }
}