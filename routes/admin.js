var express = require('express');
var admin = express.Router();

admin.get('/add',function(req,res){
  res.render('./admin/addDrama',{
    title:'添加电视剧',
    drama:{
      category:{
        name:''
      },
      name:'',
      summary:''
    },
    episodes:{
      name:'',
      flash:''
    }
  });
});

admin.get('/update/:id',function(req,res){
  res.render('./admin/addDrama',{
    title:'更新电视剧信息',
    drama:{
      category:{
        name:''
      },
      name:'',
      summary:''
    },
    episodes:{
      name:'',
      flash:''
    }

  })
});

admin.get('/dlist',function(req,res){
  res.render('./admin/dramaList',{
    title:'电视剧列表',
    dramas:{
      drama1:{
        _id:586,
        category:{
          name:'悬疑'
        },
        name:'',
        year:'1995'
      },
      drama2:{
        _id:586,
        category:{
          name:'悬疑'
        },
        name:'',
        year:'1995'
      }
    }
  });
});

admin.get('/ulist',function(req,res){
  res.render('./admin/userList',{
    title:'用户列表',
    users:{
      user1:{
        _id:586,
        name:'ssds',
        level:1
      },
      user2:{
        _id:586,
        name:'ssds',
        level:1
      }
    }
  });
});

module.exports = admin;