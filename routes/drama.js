var express = require('express');
var drama  = express.Router();

//路由的根目录为 drama(虚拟目录)
drama.get('/:did',function(req,res){
  //模板根目录为 views
  res.render('./drama/detail',{
    drama:{
      id:req.params.did,
      poster:'',
      name:'一公升的眼泪',
      year:2005,
      summary:'一公升的眼泪',
      episodes:{
        episodes1:{
          id:1,
          name:'第一集',
          flash:''
        },
        episodes2:{
          id:2,
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
    episode:{
      id:req.params.eid,
      name:'第一集',
      flash:''
    }
  });
});

module.exports = drama;