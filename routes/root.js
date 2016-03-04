var express = require('express');
var multer = require('multer');
var root = express.Router();


var upload = multer({
              dest:'./public/upload/',
              rename:function(fieldname, filename){
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
              }});
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