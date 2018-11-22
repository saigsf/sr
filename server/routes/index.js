var express = require('express');
var router = express.Router();
var fs = require('fs')
var mutipart = require('connect-multiparty');

var mutipartMiddeware = mutipart();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/file_upload', mutipartMiddeware, function (req, res) {
  console.log(req.files.image)

  var des_file = __dirname + "/" + req.files.image.originalFilename;

  fs.readFile(req.files.image.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.files.image.originalFilename
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
})

module.exports = router;