const express = require('express');
var app = express();
const path = require('path');
var multer  = require('multer');
var fs = require('fs');


module.exports  =   {
    
      imageUpload: function(req, callback) {
        if(req.uploadFrom == 'store'){
          var dest = '/store'
        }

        var dir =  './purpleServer/public/uploads'+ dest;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
          var storage  = multer.diskStorage({
          destination: dir,
          filename: function(req, file, cb){
            cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
          } 

        });



        var upload = multer({
          storage: storage
        }).single('image');

        // var upload = multer({ dest: 'upload/'});
        // var fs = require('fs');

        /** Permissible loading a single file, 
            the value of the attribute "name" in the form of "recfile". **/

        // app.post('/api/upload', function(req, res) {
        //   return callback.send("sdfsdsdfd");
        //   console.log(req.file);
          upload(req, res, (err)=>{
            if(err){
              console.log(err);
            }
            console.log(req.file);
          });
        // });
    }

}
