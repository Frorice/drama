var mongoose = require('mongoose')
var DramaSchema = require('../schemas/drama')
var Drama = mongoose.model('Drama', DramaSchema)

module.exports = Drama