const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeFetch = require('node-fetch');
const User = require('../models/users');
const Submission = require('../models/submission');
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
        const { tokens } = await oauth2Client.getToken(req.body.code)
        const google_profile = await nodeFetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
        });
        const { id, name, email, picture } = await google_profile.json()
        const tokenpair = await generateTokens(id, 'user')
        res.cookie('job_portal_token', tokenpair[1], {
            httpOnly: true,
            sameSite: true,
            path: '/refresh',
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
                user,
                access_token: tokenpair[0]
            })
        }
        var en = new Date()
        console.log(en-st)
        return res.status(200).json({
            user: existingUser,
            access_token: tokenpair[0]
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

// exports.test = async(req,res) => {
//     try{
//         const submission = await new Submission({
//             answers: [
//                 {
//                     question: 'jbasajdvkj',
//                     answer: 'ysfdigadvh'
//                 }
//             ]
//         }).save()
//         res.json(submission)
//     }
//     catch(err){
//         console.log(err)
//         res.json({
//             err
//         })
//     }
// }

// exports.users_signup = (req,res)=>{
//     User.find({ email: req.body.email }).exec().then(user=>{
//         if(user.length>0){
//             res.status(409).json({
//                 message: "Email exists"
//             })
//         }
//         else{
//             bcrypt.hash(req.body.password, 10, (err,hash)=>{
//                 if(err){
//                     return res.status(500).json({
//                         error: err
//                     })
//                 }
//                 else{
//                     const user = new User({
//                         _id: new mongoose.Types.ObjectId(),
//                         email: req.body.email,
//                         password: hash,
//                         name: req.body.name,
//                         phno: req.body.phno
//                     })
//                     user.save().then(result=>{
//                         console.log(result);
//                         res.status(201).json({
//                             message: 'User Created'
//                         })
//                     }).catch(err=>{
//                         res.status(500).json({
//                             error: err
//                         })
//                     })
//                 }
//             })
//         }
//     })
// }

// exports.users_login = (req,res,next)=>{
//     User.find({email: req.body.email}).exec().then(user=>{
//         if(user.length===0){
//             return res.status(401).json({
//                 message: 'Authorization failed'
//             })
//         }
//         else{
//             bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
//                 if(err){
//                     res.status(401).json({
//                         message: 'Authorization failed'
//                     })
//                 }
//                 if(result){
//                     const token = jwt.sign({
//                         email: user[0].email,
//                         userId: user[0]._id
//                     }, "SECRETKEY", {
//                         expiresIn: '400s'
//                     })
//                     return res.status(200).json({
//                         message: 'Authorization successful',
//                         token: token,
//                         docs: user
//                     })
//                 }
//                 else{
//                     return res.status(401).json({
//                         message: 'Authorization failed'
//                     })
//                 }
//             })
//         }
//     }).catch(err=>{
//         res.status(500).json({
//             error: err
//         })
//     })
// }

// exports.get_user = (req,res,next) => {
//   User.find({_id: req.params.userId}).exec().then(user=>{
//     res.status(200).json({
//       docs: user
//     })
//   })
// }

// exports.check = (req,res,next) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, "SECRETKEY");
//         req.userData = decoded;
//         res.status(200).json({
//             message:"success"
//         })
//     }
//     catch(err){
//         return res.status(401).json({
//             message: 'Auth failed'
//         })
//     }
// }

// exports.users_delete_user = (req,res,next)=>{
//     User.remove({_id: req.params.userId}).exec().then(result=>{
//         res.status(200).json({
//             message: "user Deleted"
//         })
//     }).catch(err=>{
//         res.status(500).json({
//             error: err
//         })
//     })
// }

// exports.update = (req,res,next)=>{
//     const id = req.params.userId;
//     User.update({_id: id}, {$set: req.body}).exec().then(result=>{
//         res.status(200).json({
//             message: 'Updated',
//         })
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     })
// }