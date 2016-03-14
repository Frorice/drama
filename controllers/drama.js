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
      .find({drama: did})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('./drama/play', {
          title: drama.name,
          episode: drama.episodes[number-1],
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
      drama: {
        name:'',
        year:'2016'
      },
      episodes:{}
    })
  })
}

// admin update page
exports.update = function(req, res) {
  var id = req.params.did

  if (id) {
    Drama.findById(id, function(err, drama) {

      var episodes = {};
      var names = [];
      var flashs = [];

      drama.episodes.forEach(function(episode){        
        names.push(episode.name);
        flashs.push(episode.flash);
      });

      episodes.name = names.join('|');
      episodes.flash = flashs.join('|');

      Category.find({}, function(err, categories) {
        
        res.render('./admin/addDrama', {
          title: 'DRAMA更新页',
          drama: drama,
          categories: categories,
          episodes:episodes
        })
      })
    })
  }
}

// admin poster
exports.savePoster = function(req, res, next) {
  if(req.file){
    var posterData = req.file
    var filePath = posterData.path
    var originalFilename = posterData.originalname
  }
  if (originalFilename) {

    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = originalFilename.split('.')[1]
      var poster = '/upload/' + timestamp + '.' + type
      var newPath = path.join(__dirname, '../', '/public' + poster)
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
//处理剧集
exports.dealEpisodes = function (req, res, next){
  var drama = req.body.drama;
  var isEmpty = false;
  for( var i in drama){
    if(!drama[i]){
      Category.find({}, function(err, categories) {
        res.render('./admin/addDrama', {
            title: 'DRAMA录入页',
            categories: categories,
            drama: {
              name:'',
              year:'2016'
            },
            episodes:{},
            err:{
              info:'请填写完整的信息！'
            }
          })
      })
      isEmpty = true;
      break;
    }
  }
  if(!isEmpty){
    var episodeNames = [],
        episodeFlashs = [],
        episode = {};
    var episodeNumber,length;

    drama.episodes = [];
    //将剧集名和剧集地址推入drama.episodes保存
    if(drama.episodeName){
      episodeNames = drama.episodeName.split('|');
    }
    if(drama.episodesFlash){
      episodeFlashs = drama.episodesFlash.split('|');
    }
    if(episodeNames.length>0&&episodeFlashs.length>0){
      //选择较少项保证剧集信息完整性
      length = (episodeNames.length>episodeFlashs.length)?episodeFlashs.length:episodeNames.length;
      for(episodeNumber=0;episodeNumber<length;episodeNumber++){
        episode = {
          number:episodeNumber+1,
          flash:episodeFlashs[episodeNumber],
          name:episodeNames[episodeNumber]
        };
        drama.episodes.push(episode);

      }
    }
    next();
  }
}

// admin post drama
exports.save = function(req, res) {
  var id = req.body.drama._id
  var dramaObj = req.body.drama
  dramaObj.poster = req.poster
  var _drama

  console.log(dramaObj)

  if (id) {
    Drama.findById(id, function(err, drama) {
      if (err) {
        console.log(err)
      }
      
      //若上传了海报
      if (req.poster) {
        dramaObj.poster = req.poster
        
        if(drama.poster){
          fs.unlinkSync(path.join(__dirname, '../', '/public' + drama.poster))
        }

      }else{
        dramaObj.poster = drama.poster
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
          if(err){
            console.log(err)
          }
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