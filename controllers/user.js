var mongoose = require('mongoose')
require('./models/user')
var User = mongoose.model('User')
var _ = require('underscore')

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
exports.saveData = function(req,res){
  var userObj = req.body.user;
  var _user;

  User.findById(req.params.id,function(err,user){
    if(err){
      console.log(err);
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