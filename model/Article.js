var mongoose = require('../data/mongoose')

var ArticleSchema = mongoose.Schema({
    title: String,
    link: String,
    time: Date
})

module.exports = mongoose.model('Article', ArticleSchema)