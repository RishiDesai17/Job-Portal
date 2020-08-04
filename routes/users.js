const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload')
const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         console.log(file)
//         cb(null, `./uploads/`)
//     },
//     // filename: (req,file,cb)=>{
//     //     cb(null, new Date().toISOString() + file.originalname) //file.filename
//     // }
// })

// const fileFilter = (req,file,cb)=>{
//     console.log("filefilter")
//     // reject cb(null,false)
//     //accept cb(null,true)
//     if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='pdf'){
//         cb(null,true);
//     }
//     else{
//         cb(new Error('Invalid File Type'),false);
//     }
    
// }

// const upload = multer({
//     storage: storage, 
//     limits: {
//         fileSize: 1024*1024*5
//     },
//     fileFilter: fileFilter
// }); //{dest: 'uploads/'}

// module.exports = upload

// router.post('/signup', UsersController.users_signup)

router.post('/googlelogin', UsersController.googlelogin)

router.post('/resume', [checkAuth, upload.single('resume')], UsersController.addResume)

// router.get('/:userId', checkAuth, UsersController.get_user)

// router.delete('/:userId', checkAuth, UsersController.users_delete_user)

// router.patch('/:userId', checkAuth, UsersController.update)

// router.post('/message', checkAuth, UsersController.message)

module.exports = router;
