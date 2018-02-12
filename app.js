const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cors          = require('cors');
const models = require('./purpleServer/models');
var env           = process.env.NODE_ENV || 'development';
var fs = require('fs');
const config = require(__dirname  + '/purpleServer/config/config.json')[env];


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'purpleServer/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer implementation
var multer  = require('multer');
var MAU = require('./purpleServer/public/js/modify-and-upload');

//disk storage defining

var storage  = multer.diskStorage({
  destination: (req, file, cb) => {
  let dirPath = pathSet(req);
  let origImagePath = dirPath+'/original/';
  let thumbImagePath = dirPath+'/thumbnail/';
  checkPath(origImagePath);
  checkPath(thumbImagePath);
//fs.mkdirsSync(path);
  cb(null, origImagePath); },
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    } 

});

//store engine define

var upload = multer({
  storage: storage
});

// path set by headers type
function pathSet(req,types){
    var type = req.headers.type;
    var id = req.headers.storeid;
    let path;
    if(type == ''){
      var type = 'otherFiles';
    }
    path = `./purpleServer/public/uploads/store-${id}/`;

    checkPath(path);
    const userImage = path+type;
    checkPath(userImage);
    return userImage;
}

// check or make dir path
function checkPath(path){
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
}

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/

app.post('/api/uploadFiles',upload.any(), function(req, res, next) {
  let dirPath = pathSet(req,'thumb');
  var mau = new MAU(req.files,dirPath, function(err, newImagePath){
    if(err){ res.render('index', { 
        status: 'Error uploading' }); 
    }
    res.render('index', {
      status: 'Finished uploading',
      newImage: newImagePath
    });
  });
  if(req.files){
    res.send({
    status: true,
    data: req.files
    });
  }
});






/* Create API Route Path */

app.post('/api/login',login);

var user = models.purpleUser;

/*create token*/
function createToken(data){
  console.log('ssss',config.secretKey);
  var token = jwt.sign({u: data.email}, config.secretKey, {

  });
  token = token.replace(/\./g, "ar4Jq1V");
  return token;
}

// login api for dashboard with email id & password
function login(req,res){
	console.log(req.body,'req.body');
  user.find({where:{email:req.body.email},
  //attributes:[],
  }).then(function(results){
      if(results){
        var passwordMatch   =   bcrypt.compare(req.body.password,results['dataValues']['password'],function(err,validUser){
          if(validUser==true){          
            var token = createToken(req.body);
            res.status(200).send({success:true,token:token,message:'Logged in successfully',data:results});
          }else{
            res.status(401).send({success:false,message:'Incorrect password'});
          }
        });
      }else {
        res.status(401).send({success:false,message:'Incorrect Email'});
      }
    });
}

// // Validation
// app.use(function(req, res, next){
//   console.log("checktocken",req.headers.token)
//   var token = req.headers['token']|| req.headers['token'];
//   var device_id  = req.headers['device_id'];
//   console.log(token,'tttt')
// 	if(token)
// 	{
// 	    token = token.replace(/ar4Jq1V/g, ".");
// 	    jwt.verify(token, config.secretKey, function(err, decoded) {
// 	      console.log("fsdkfskldf",decoded)
// 			if (err) {
// 		        if(err && err.name == 'TokenExpiredError') {
// 		          return res.json({status: 'success', message: 'Session expired' });
// 		        } else {
// 		          return res.json({ status: 'error', message: 'Failed to authenticate token.' });
// 		        }
// 		    } if(decoded){
// 		        next();
// 		    }
// 	    });
// 	}
// 	else{
// 	    // res.status(403).send({ 
// 	    //   status: 'error', 
// 	    //   message: 'No token provided.' 
// 	    // });
//     next();
// 	}
// });

require('./purpleServer/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
