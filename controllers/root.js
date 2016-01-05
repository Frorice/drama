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

// search page
exports.search = function(req, res) {
  var catId = req.query.cat
  var q = req.query.q
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count

  if (catId) {
    Category
      .find({_id: catId})
      .populate({
        path: 'drama',
        select: 'name poster'
      })
      .exec(function(err, categories) {
        if (err) {
          console.log(err)
        }
        var category = categories[0] || {}
        var dramas = category.dramas || []
        var results = dramas.slice(index, index + count)

        res.render('results', {
          title: '搜索结果',
          keyword: category.name,
          currentPage: (page + 1),
          query: 'cat=' + catId,
          totalPage: Math.ceil(dramas.length / count),
          dramas: results
        })
      })
  }
  else {
    Drama
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, dramas) {
        if (err) {
          console.log(err)
        }
        var results = dramas.slice(index, index + count)

        res.render('results', {
          title: '搜索结果',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(dramas.length / count),
          dramas: results
        })
      })
  }
}