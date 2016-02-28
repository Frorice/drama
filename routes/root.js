var express = require('express');
var multer = require('multer');
var root = express.Router();



//控制器
var Root = require('../controllers/root')
var User = require('../controllers/user')


root.get('/',Root.index);

root.get('/signin',User.showSignin);

root.get('/signup',User.showSignup);

root.get('/logout',User.logout);

root.post('/signin',User.signin);

root.post('/signup',User.signup);

root.get('/results',Root.search)

module.exports = root;