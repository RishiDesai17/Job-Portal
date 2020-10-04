const nodeFetch = require('node-fetch');
const User = require('../models/users');
const { generateTokens } = require('../utils/token')

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/auth'
);

exports.googlelogin = async(req, res) => {
    try{
        var st = new Date()
        console.log("x")
        console.log(req.body)
        const resp = await oauth2Client.getToken(req.body.code)
        console.log(resp)
        const tokens = resp.tokens
        const google_profile = await nodeFetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
        });
        const { id, name, email, picture } = await google_profile.json()
        const tokenpair = await generateTokens(id, 'user')
        let dt = new Date()
        res.cookie('job_portal_token', tokenpair[1], {
            httpOnly: true,
            sameSite: true,
            // path: '/refresh',
            expires: new Date(dt.setMonth(dt.getMonth()+6)),
            secure: false
        })
        const existingUser = await User.findById(id)
        if(existingUser === null){
            const user = await new User({
                _id: id,
                name,
                email,
                profile_pic: picture
            }).save()
            var en = new Date()
            console.log(en-st)
            return res.status(200).json({
                message: 'Authorization successful',
                profile: user,
                role: 'user',
                access_token: tokenpair[0]
            })
        }
        var en = new Date()
        console.log(en-st)
        return res.status(200).json({
            message: 'Authorization successful',
            profile: existingUser,
            role: 'user',
            access_token: tokenpair[0]
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            message: 'Authorization failed'
        })
    }
}

exports.logout = (req, res) => {
    try{
        res.clearCookie("job_portal_token");
        return res.status(200).json({
            message: 'Logged out'
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

exports.addResume = async(req, res) => {
    try{
        console.log(req.body, req.file)
        const updated = await User.findByIdAndUpdate(req.userData.id, {
            $push: { 'resumes': req.file.path }
        })
        return res.status(200).json({
            path: req.file.path
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}