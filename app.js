var express = require('express');
var bodyParser = require('body-parser');
var user = require('./routes/user');
var drama = require('./routes/drama');
var cat = require('./routes/cat');
var root = require('./routes/root');
var admin = require('./routes/admin');
var app = express();

//设置模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');

//先加载第三方中间件，后面要用到
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//加载路由中间件（路径相对于根目录）
app.use(root);
app.use('/user',user);
app.use('/drama',drama);
app.use('/cat',cat);
app.use('/admin',admin);

app.listen(3000,function(){
	console.log('Server is running at port 3000');
});

