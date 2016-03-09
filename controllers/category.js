var mongoose = require('mongoose')
require('./models/drama')
require('./models/category')
var Category = mongoose.model('Category')
var Drama = mongoose.model('Drama')
// admin new page
exports.new = function(req, res) {
  res.render('./admin/addCategory', {
    title: '分类录入页',
    category: {}
  })
}

// admin post drama
exports.save = function(req, res) {
  var _category = req.body.category
  var category = new Category(_category)

  category.save(function(err, category) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/clist')
  })
}

// catelist page
exports.list = function(req, res) {
  Category.fetch(function(err, categories) {
    if (err) {
      console.log(err)
    }

    res.render('./admin/categoryList', {
      title: '分类列表页',
      categories: categories
    })
  })
}

exports.getCate = function(req,res){
  var cid = req.params.cid

  Category.findById(cid, function(err, category) {
    Drama
      .find({category: cid})
      .exec(function(err, dramas) {
        res.render('./category/category', {
          title: category.name,
          dramas: dramas,
          cat:category
        })
      })
  })
}