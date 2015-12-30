var express = require('express');

var user  = express.Router();

user.get('/:id',function(req,res){
	res.render('./user/user',{
    personal:{
      avt:'',
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

module.exports = user;
