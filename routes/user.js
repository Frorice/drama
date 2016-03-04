var express = require('express');
var multer = require('multer');
var user  = express.Router();

var upload = multer({
              dest:'./public/upload/',
              rename:function(fieldname, filename){
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
              }});

//控制器
var User = require('../controllers/user')
var Comment = require('../controllers/comment')


//路由的根目录为 user(虚拟目录)
user.get('/:id',User.signinRequired,User.detail);

user.get('/:id/data',User.signinRequired,User.getData);

user.post('/:id/data',upload.single('avt'),User.signinRequired,User.saveAvt,User.saveData);

user.post('/comment',upload.single('avt'),User.signinRequired, Comment.save)

module.exports = user;