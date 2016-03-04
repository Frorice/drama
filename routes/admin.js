var express = require('express');
var multer = require('multer');
var admin = express.Router();

var upload = multer({
              dest:'./public/upload/',
              rename:function(fieldname, filename){
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
              }});


//控制器
var User = require('../controllers/user')
var Drama = require('../controllers/drama')
var Category = require('../controllers/category')

admin.get('/drama/add',User.signinRequired, User.adminRequired, Drama.new);

admin.get('/category/add',User.signinRequired, User.adminRequired, Category.new);

admin.get('/update/:id',User.signinRequired, User.adminRequired,Drama.update);

admin.get('/dlist',User.signinRequired, User.adminRequired,Drama.list);

admin.get('/clist',User.signinRequired, User.adminRequired,Category.list);

admin.get('/ulist',User.signinRequired, User.adminRequired,User.list);

admin.post('/drama',upload.single('uploadPoster'),User.signinRequired, User.adminRequired, Drama.savePoster, Drama.save);

admin.post('/category',upload.single('avt'),User.signinRequired, User.adminRequired, Category.save);

admin.delete('/dlist', User.signinRequired, User.adminRequired, Drama.del);

module.exports = admin;