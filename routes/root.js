var express = require('express');
var multer = require('multer');
var root = express.Router();


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
var Root = require('../controllers/root')
var User = require('../controllers/user')


root.get('/',Root.index);

root.get('/signin',User.showSignin);

root.get('/signup',User.showSignup);

root.get('/logout',User.logout);

root.post('/signin',upload.single('avt'),User.signin);

root.post('/signup',upload.single('avt'),User.signup);

root.get('/results',Root.search)

module.exports = root;