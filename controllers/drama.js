var mongoose = require('mongoose')
require('./models/drama')
require('./models/category')
require('./models/comment')
var Drama = mongoose.model('Drama')
var Category = mongoose.model('Category')
var Comment = mongoose.model('Comment')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')

// detail page
exports.detail = function(req, res) {
  var id = req.params.did
  Drama.findById(id, function(err, drama) {
    Comment
      .find({drama: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('./drama/detail', {
          title: drama.name,
          drama: drama,
          comments: comments
        })
      })
  })
}
exports.episodes = function(req, res) {
  var did = req.params.did;
  var number = req.params.eid;
  
  Drama.findById(did, function(err, drama) {
    Comment
      .find({drama: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('./drama/detail', {
          title: drama.name,
          drama: drama.episodes[number],
          comments: comments
        })
      })
  })
}
// admin new page
exports.new = function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('./admin/addDrama', {
      title: 'DRAMA录入页',
      categories: categories,
      drama: {},
      episodes:{}
    })
  })
}

// admin update page
exports.update = function(req, res) {
  var id = req.params.id

  if (id) {
    Drama.findById(id, function(err, drama) {
      Category.find({}, function(err, categories) {
        res.render('./admin/addDrama', {
          title: 'DRAMA更新页',
          drama: drama,
          categories: categories,
          episodes:{}
        })
      })
    })
  }
}

// admin poster
exports.savePoster = function(req, res, next) {
  var posterData = req.file
  var filePath = posterData.path
  var originalFilename = posterData.originalname
  if (originalFilename) {

    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = originalFilename.split('.')[1]
      var poster = timestamp + '.' + type
      var newPath = path.join(__dirname, '../', '/public/upload/' + poster)
      fs.writeFile(newPath, data, function(err) {
        req.poster = poster
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

// admin post drama
exports.save = function(req, res) {
  var id = req.body.drama._id
  var dramaObj = req.body.drama
  var _drama

  if (req.poster) {
    dramaObj.poster = req.poster
  }

  if (id) {
    Drama.findById(id, function(err, drama) {
      if (err) {
        console.log(err)
      }

      _drama = _.extend(drama, dramaObj)
      _drama.save(function(err, drama) {
        if (err) {
          console.log(err)
        }

        res.redirect('/drama/' + drama._id)
      })
    })
  }
  else {
    _drama = new Drama(dramaObj)

    var categoryId = dramaObj.category
    var categoryName = dramaObj.categoryName

    _drama.save(function(err, drama) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.dramas.push(drama._id)

          category.save(function(err, category) {
            res.redirect('/drama/' + drama._id)
          })
        })
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          dramas: [drama._id]
        })

        category.save(function(err, category) {
          drama.category = category._id
          drama.save(function(err, drama) {
            res.redirect('/drama/' + drama._id)
          })
        })
      }
    })
  }
}

//Drama list page
exports.list = function(req, res) {
  Drama.find({})
    .populate('category', 'name')
    .exec(function(err, dramas) {
      if (err) {
        console.log(err)
      }

      res.render('./admin/dramaList', {
        title: 'Drama列表页',
        dramas: dramas
      })
    })
}

// delete page
exports.del = function(req, res) {
  var id = req.query.id

  if (id) {
    Drama.remove({_id: id}, function(err, drama) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
}