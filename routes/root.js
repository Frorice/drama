var express = require('express');
var root = express.Router();

root.get('/',function(req,res){
  res.render('index',{
    title:'DRAMA 首页',
    categories:{
      cat1:{ 
        _id:1,
        name:'悬疑',
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
      },
      cat2:{
        _id:2,
        name:'励志',
        dramas:{
          drama1:{
            _id:7,
            poster:'',
            name:'一公升的眼泪'
          },
          drama2:{
            _id:8,
            poster:'',
            name:'二公升的眼泪'
          }
        }
      }
    }
  });
});

root.get('/signin',function(req,res){
  res.render('./signin',{
    title:'登录'
  });
});

root.get('/signup',function(req,res){
  res.render('./signup',{
    title:'注册'
  });
});
module.exports = root;