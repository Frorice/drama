var express = require('express');
<<<<<<< HEAD
var user  = express.Router();

//路由的根目录为 user(虚拟目录)
user.get('/:id',function(req,res){
  //模板根目录为 views
	res.render('./user/user',{
    personal:{
      avt:'',
      id:req.params.id,
=======

var user  = express.Router();

user.get('/:id',function(req,res){
	res.render('./user/user',{
    personal:{
      avt:'',
>>>>>>> 915fa6dcceec7f251501f0ece0a2ba317d483fa7
      data:{
        name:'fanfan',
        age:18,
        registTime:'2015-12-30',
        touch:'18569422761'
      },
      favorite:{
        a:'aaaa',
        b:'bbbbb'
      }
    }
  });

  console.log(req.params.id);
});

<<<<<<< HEAD
user.get('/:id/data',function(req,res){
  res.render('./user/userData');
});

module.exports = user;
=======
module.exports = user;
>>>>>>> 915fa6dcceec7f251501f0ece0a2ba317d483fa7
