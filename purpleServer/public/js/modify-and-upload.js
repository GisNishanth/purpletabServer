'use strict';

  var gm = require('gm').subClass({ imageMagick: true });

  function ModifyAndUpload(img, dirPath, callback){
    this.img = img;
    this.dirPath = dirPath;
    this.callback = callback;
    init(img,dirPath);
  }


   function modifyImage(origPath,thumbPath){
      var that = this;
      gm(origPath)
        .resize(175, 175 + '^')
        .gravity('center')
        .extent(175, 175)
        .write(thumbPath, function (err){
          console.log(err,'errrrrrr');
          // if (that.callback && typeof(that.callback) === 'function'){
          //   that.callback(err, that.publicPathOfThumb);
          // }
        }); 
    }

    function init(img,dirPath){
      var saveFolder =  dirPath + '/thumbnail/';
      console.log(saveFolder,'saveddFolder');
      if(img.length && img){
        img.forEach(function(data){
          var origPath = data.path;
          var thumbPath = saveFolder + data.filename;  
          console.log(origPath,'originallll');
          console.log(thumbPath,'thumbImageeee');
          modifyImage(origPath,thumbPath);
        })
      }
      
    }

  

  module.exports = ModifyAndUpload;