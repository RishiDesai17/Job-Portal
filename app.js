const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'})

const userRoutes = require('./routes/users');

mongoose.connect(process.env.DBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use('/uploads',express.static('uploads'));
app.use(express.json());

// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','*');
//   res.header('Access-Control-Allow-Headers','*');//Origin, X-Requested-With, Content-Type, Accept, Authorization
//   if(req.method==='OPTIONS'){
//     res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// })

if(process.env.NODE_ENV === "dev"){
  console.log('dev')
  const whitelist = ['http://localhost:3000'];
      var corsOptionsDelegate = (req, callback) => {
      var corsOptions;
      console.log(req.header('Origin'));
      if(whitelist.indexOf(req.header('Origin')) !== -1) {
          corsOptions = { origin: true };
      }
      else {
          corsOptions = { origin: false };
      }
      callback(null, corsOptions);
  };
  exports.cors = cors();
  exports.corsWithOptions = cors(corsOptionsDelegate);
}
else{
  app.use(express.static("reactclient/build"));

  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/reactclient/build/index.html");
  });
}

app.use('/api/users', userRoutes);

app.use((req,res,next)=>{
  const error = new Error("Not Found...");
  error.status = 404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;