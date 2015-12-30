var express = require('express');
var user = require('./routes/user');
var bodyParser = require('body-parser');
var app = express();

//设置模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');

//先加载第三方中间件，后面要用到
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//加载路由中间件
app.use('/user',user);

app.get('/',function(req,res){
	res.render('index',{
    title:'DRAMA 首页'
  });
});

app.listen(3000,function(){
	console.log('Server is running at port 3000');
});

