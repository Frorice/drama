var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var path  = require('path');
var fs = require('fs');

//路由
var user = require('./routes/user');
var drama = require('./routes/drama');
var cat = require('./routes/cat');
var root = require('./routes/root');
var admin = require('./routes/admin');

var dbUrl = 'mongodb://fanfan:608125@localhost/drama';
mongoose.connect(dbUrl);

var app = express();
var staticfile = path.join(__dirname,'public');

//设置模板引擎
app.set('views','./views/pages');
app.set('view engine','jade');

//先加载第三方中间件，后面要用到
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(session({
  secret: 'drama',
  store: new MongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

//user 预处理
app.use(function(req, res, next) {
    var _user = req.session.user

    app.locals.user = _user

    next()
});

//加载路由中间件（路径相对于根目录）
app.use(root);
app.use('/user',user);
app.use('/drama',drama);
app.use('/cat',cat);
app.use('/admin',admin); 

//配置静态目录
app.use(express.static(staticfile));

app.locals.moment = require('moment')
app.listen(3000,function(){
	console.log('Server is running at port 3000');
});


