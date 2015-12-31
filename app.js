var express = require('express');
var bodyParser = require('body-parser');
var user = require('./routes/user');
var drama = require('./routes/drama');
var cat = require('./routes/cat');

var app = express();

//设置模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');

//先加载第三方中间件，后面要用到
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//加载路由中间件（路径相对于根目录）
app.use('/user',user);
app.use('/drama',drama);
app.use('/cat',cat);

app.get('/',function(req,res){
	res.render('index',{
    title:'DRAMA 首页',
    categories:{
      cat1:{ 
        id:1,
        name:'悬疑',
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
      },
      cat2:{
        id:2,
        name:'励志',
        dramas:{
          drama1:{
            id:7,
            poster:'',
            name:'一公升的眼泪'
          },
          drama2:{
            id:8,
            poster:'',
            name:'二公升的眼泪'
          }
        }
      }
    }
  });
});

app.listen(3000,function(){
	console.log('Server is running at port 3000');
});

