var express = require('express');
var multer = require('multer');
var user  = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.name);
  }
})
var upload = multer({ storage: storage });

//控制器
var User = require('../controllers/user')
var Comment = require('../controllers/comment')

console.log("ss")
//路由的根目录为 user(虚拟目录)
user.get('/:id',User.signinRequired,User.detail);

user.get('/:id/data',User.signinRequired,User.getData);

user.post('/:id/data',upload.single('avt'),User.signinRequired,User.saveData);

user.post('/comment',upload.single('avt'),User.signinRequired, Comment.save)

module.exports = user;