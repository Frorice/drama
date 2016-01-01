var express = require('express');
var drama  = express.Router();

//路由的根目录为 drama(虚拟目录)
drama.get('/:did',function(req,res){
  //模板根目录为 views
  res.render('./drama/detail',{
    title:'一公升的眼泪',
    drama:{
      id:req.params.did,
      poster:'',
      name:'一公升的眼泪',
      year:2005,
      summary:'一公升的眼泪',
      episodes:{
        episodes1:{
          _id:1,
          name:'第一集',
          flash:''
        },
        episodes2:{
          _id:2,
          name:'第二集',
          flash:''
        }
      },
      meta:{
        createTime:2015,
        updateTime:2015
      }
    }
  });
});

drama.get('/:did/:eid',function(req,res){
  res.render('./drama/play',{
    title:'第一集-一公升的眼泪',
    episode:{
      _id:req.params.eid,
      name:'第一集',
      flash:''
    }
  });
});

module.exports = drama;