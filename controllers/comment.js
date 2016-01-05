var mongoose = require('mongoose')
require('./models/comment')
var Comment = mongoose.model('Comment')

// comment
exports.save = function(req, res) {
  var _comment = req.body.comment
  var dramaId = _comment.drama

  if (_comment.cid) {
    Comment.findById(_comment.cid, function(err, comment) {
      var reply = {
        from: _comment.from,
        to: _comment.to,
        content: _comment.content
      }

      comment.reply.push(reply)

      comment.save(function(err, comment) {
        if (err) {
          console.log(err)
        }

        res.redirect('/drama/' + dramaId)
      })
    })
  }
  else {
    var comment = new Comment(_comment)

    comment.save(function(err, comment) {
      if (err) {
        console.log(err)
      }

      res.redirect('/drama/' + dramaId)
    })
  }
}