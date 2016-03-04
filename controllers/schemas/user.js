var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_COST_ROUND = 10

var USER = new mongoose.Schema({
  name:{
    unique:true,
    type:String
  },
  password:String,
  // 0 普通用户
  // 608 管理员
  level:{
    type:Number,
    default:0
  },
  data:{
    email:String,
    age:{
      type:Number,
      default:0
    },
    registTime:{
      type:Date,
      default:Date.now()
    },
    updateTime:{
      type:Date,
      default:Date.now()
    },
    info:{
      type:String,
      default:"这个人很懒，什么都没留下~"
    },
    avt:String
  }

});

USER.pre('save', function(next) {
  var user = this
  if (user.isNew) {
    user.data.createAt = user.data.updateAt = Date.now()
  }
  else {
    user.data.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_COST_ROUND, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

USER.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

USER.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('data.updateTime')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = USER