var express = require('express')
var router = express.Router()
var Article = require('../model/Article')
var urllib = require('urllib')
var TITLE_REG = /<title>(.*)<\/title>/

router.get('/api/articles', list)
router.post('/api/articles', create)

function list(req, res, next) {
    Article.find({}, 'link title time', function (err, docs) {
        if (err) return next(err)
        res.json({ results: docs })
    })
}

function create(req, res, next) {
    var link = req.body.link
    var article = new Article({ link: link })
    article.title = '无标题'
    article.time = new Date()
    article.save(function (err) {
        if (err) next(err)
        res.json({})
        fetchTitle(article)
    })
}

function fetchTitle(article) {
    urllib.request(article.link, { dataType: 'text' }, function (err, data) {
        if (err) return cb(err)
        var title = data.toString().match(TITLE_REG)
        article.title = title && title[1] || '无标题'
        article.save(function () {
            console.log(article)
        })
    })
}

module.exports = router
