var express = require('express');
var user  = express.Router();

//路由的根目录为 user(虚拟目录)
user.get('/:id',function(req,res){
  //模板根目录为 views
	res.render('./user/user',{
    title:'个人中心',
    personal:{
        avt:'',
        _id:req.params.id,
        data:{
          name:'fanfan',
          age:18,
          registTime:'2015-12-30',
          touch:'18569422761'
        },
        favorite:{
          dramas:{
            drama1:{
              _id:5,
              poster:'',
              name:'一公升的眼泪'
            },
            drama2:{
              _id:6,
              poster:'',
              name:'二公升的眼泪'
            }
          }
        }
      }
  });

  console.log(req.params.id);
});

user.get('/:id/data',function(req,res){
  res.render('./user/userData',{
    title:'资料修改'
  });
});

module.exports = user;