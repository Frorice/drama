var express = require('express');
var cat = express.Router();

cat.get('/:cid',function(req,res){
  res.render('./category/category',{
    cat:{
      title:'分类页',
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