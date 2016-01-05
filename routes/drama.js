var express = require('express');
var drama  = express.Router();

//控制器

var Drama = require('../controllers/drama')


//路由的根目录为 drama(虚拟目录)
drama.get('/:did',Drama.detail);

drama.get('/:did/:eid',Drama.episodes);

module.exports = drama;