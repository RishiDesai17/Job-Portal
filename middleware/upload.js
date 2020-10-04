const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let dest = `./uploads/${req.userData.id}`
        if(!fs.existsSync(dest)){
            fs.mkdirSync(dest)
        }
        cb(null, dest)
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + "_" + file.originalname) //file.filename
    }
})

const fileFilter = (req,file,cb)=>{
    console.log(file.mimetype)
    if(file.mimetype==='application/pdf'){
        cb(null,true);
    }
    else{
        cb(new Error('Invalid File Type'),false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
}); //{dest: 'uploads/'}

module.exports = upload