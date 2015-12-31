var express = require('express');
var cat = express.Router();

cat.get('/:cid',function(req,res){
  res.render('./category/category',{
    cat:{
      dramas:{
        drama1:{
          id:5,
          poster:'',
          name:'一公升的眼泪'
        },
        drama2:{
          id:6,
          poster:'',
          name:'二公升的眼泪'
        }
      }
    }
  });
});

module.exports = cat;