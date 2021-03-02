var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res,) {
   fs.readdir('./uploads',function(err,files){
     res.render('index',{files:files,action:''});
   })
});

router.get('/fileclosed', function(req, res,) {
  fs.readdir('./uploads',function(err,files){
    res.render('index',{files:files,action:'File Closed'});
  })
});

router.get('/fileopen/:filename',function(req,res){
  fs.readdir('./uploads',function(err,files){
    var fileAddress = `./uploads/${req.params.filename}`
    fs.readFile(fileAddress,'utf8',function(err,filedata){
      res.render('fileopen',{files:files,filedata:filedata,filename:req.params.filename,action:`${req.params.filename} file opened`});
    })
    
  })
 
})

router.post('/savefile/:filename', function(req,res){
 var fileaddress = `./uploads/${req.params.filename}`;
 fs.writeFile(fileaddress,req.body.filedata,function(err){
  fs.readdir('./uploads',function(err,files){
    res.render('index',{files:files,action:`${req.params.filename} file saved`});
  }) 
 })
})

router.post('/filecreation',function(req,res){
  var fileName = `./uploads/${req.body.filename}`;
  fs.writeFile(fileName,'',function(err){
    fs.readdir('./uploads',function(err,files){
      res.render('index',{files:files,action:'New File Created !'});
    }) 
  })
})



module.exports = router;
