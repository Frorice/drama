var mongoose = require('mongoose')

require('./models/drama')
require('./models/category')

var Drama = mongoose.model('Drama')
var Category = mongoose.model('Category')

// index page
exports.index = function(req, res) {
  Category
    .find({})
    .populate({
      path: 'dramas',
      select: 'name poster',
      options: { limit: 10 }
    })
    .exec(function(err, categories) {
      if (err) {
        console.log(err)
      }

      res.render('index', {
        title: 'DRAMA',
        categories: categories
      })
    })
}
//检测登录状态
exports.logged = function(req,res){
  if(req.session.user){
    res.write(req.session.user.data.avt + '-' + req.session.user._id);
    res.end();
  }else{
    res.end('false');
  }
}

exports.admin = function(req,res){
  res.render('./admin/admin');
}
// search page
exports.search = function(req, res) {
  var q = req.query.q
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count

  
    Drama
      .find({name: new RegExp(q + '.*', 'i')})
      .exec(function(err, dramas) {
        if (err) {
          console.log(err)
        }
        var results = dramas.slice(index, index + count)

        res.render('./results', {
          title: '搜索结果',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(dramas.length / count),
          dramas: results
        })
      })
  }
