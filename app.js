const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
require('dotenv').config({path: __dirname + '/.env'})

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

const userRoutes = require('./routes/users');
const tokenRoutes = require('./routes/refreshAccessTokens');
const employerRoutes = require('./routes/employers');
const jobRoutes = require('./routes/jobs');
const domainRoutes = require('./routes/domains');
const preInterviewRoutes = require('./routes/preInterview');

app.use('/api/users', userRoutes);
app.use('/api/refresh', tokenRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/pre-interview', preInterviewRoutes);

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