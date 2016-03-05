var mongoose = require('mongoose')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')
require('./models/user')
var User = mongoose.model('User')



// signup
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  })
}

exports.signup = function(req, res) {
  var _user = req.body.user
  User.findOne({name: _user.name},  function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/signin')
    }
    else {
      user = new User(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        res.redirect('/')
      })
    }
  })
}

// signin
exports.signin = function(req, res) {
  console.log(req)
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (!user) {
      return res.redirect('/signup')
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        req.session.user = user

        return res.redirect('/user/'+user._id)
      }
      else {
        return res.redirect('/signin')
      }
    })
  })
}

// logout
exports.logout =  function(req, res) {
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}

// userlist page
exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err)
    }

    res.render('./admin/userList', {
      title: '用户列表页',
      users: users
    })
  })
}
exports.detail = function(req,res){
  User.findById(req.params.id,function(err,user){
    if(err){
      console.log(err);
    }
    
    res.render('./user/user',{
      title:user.name,
      user:user
    });
  });
}
exports.getData = function(req,res){
  User.findById(req.params.id,function(err,user){
    if(err){
      console.log(err);
    }

    res.render('./user/userData',{
      title:"修改资料",
      user:user
    });
  });
}

exports.saveAvt = function(req, res, next) {
  
  if(req.file){
    var avtData = req.file
    var filePath = avtData.path
    var originalFilename = avtData.originalname
  }

  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = originalFilename.split('.')[1]
      var avt = '/upload/'+ timestamp + '.' + type
      var newPath = path.join(__dirname, '../', '/public' + avt)
      fs.writeFile(newPath, data, function(err) {
        req.avt = avt;
        //删除 原文件
        fs.unlinkSync(filePath)
        next()
      })
    })
  }
  else {
    next()
  }
}

exports.saveData = function(req,res){
  var userObj = req.body.user;
  var _user;
  User.findById(req.params.id,function(err,user){
    if(err){
      console.log(err);
    }
    if(req.avt){
      //头像路径
      //删除前一个头像
      if(user.data.avt){
        fs.unlinkSync(path.join(__dirname, '../', '/public' + user.data.avt));
      }
      userObj.data.avt = req.avt;
    }else{
      userObj.data.avt = user.data.avt;
    }
    _user = _.extend(user, userObj);
    _user.save(function(err, user) {
      if (err) {
        console.log(err);
      }
 
      res.redirect('/user/' + user._id);
    });

  });
}
// midware for user 登录验证
exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }

  next()
}
//用户验证
exports.adminRequired = function(req, res, next) {
  var user = req.session.user

  if (user.role < 608) {
    return res.redirect('/signin')
  }

  next()
}