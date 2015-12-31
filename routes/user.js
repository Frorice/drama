var express = require('express');
var user  = express.Router();

//路由的根目录为 user(虚拟目录)
user.get('/:id',function(req,res){
  //模板根目录为 views
	res.render('./user/user',{
    personal:{
      avt:'',
      id:req.params.id,
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

user.get('/:id/data',function(req,res){
  res.render('./user/userData');
});

module.exports = user;