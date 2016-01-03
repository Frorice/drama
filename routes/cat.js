var express = require('express');
var cat = express.Router();

cat.get('/:cid',function(req,res){
  res.render('./category/category',{
    title:'分类页',
    cat:{
      _id:5,
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
    }
  });
});

module.exports = cat;