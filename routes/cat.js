var express = require('express');
var cat = express.Router();

//控制器
var Category = require('../controllers/category')

cat.get('/:cid',Category.getCate);


module.exports = cat;