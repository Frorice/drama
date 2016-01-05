var express = require('express');
var user  = express.Router();


//控制器
var User = require('../controllers/user')
var Comment = require('../controllers/comment')


//路由的根目录为 user(虚拟目录)
user.get('/:id',User.signinRequired,User.detail);

user.get('/:id/data',User.signinRequired,User.getData);

user.post('/:id/data',User.signinRequired,User.saveData);

user.post('/comment', User.signinRequired, Comment.save)

module.exports = user;