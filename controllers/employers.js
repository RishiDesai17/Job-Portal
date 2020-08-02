const bcrypt = require('bcryptjs');
const Employer = require('../models/employers');
// const Job = require('../models/jobs');
const { generateTokens } = require('../utils/token')

exports.login = async(req,res)=>{
    try{
        const employer = await Employer.find({ email: req.body.email }).limit(1);
        if(employer.length === 0){
            return res.status(401).json({
                message: 'Authorization failed'
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

// exports.signup = (req,res)=>{
//     User.find({ email: req.body.email }).limit(1)
//     if(user.length > 0){
//         return res.status(409).json({
//             message: "Email already exists"
//         })
//     }
//     new Employer({

//     })
    
//     exec().then(user=>{
        
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