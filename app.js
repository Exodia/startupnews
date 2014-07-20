var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')

var routes = require('./api/article')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/', routes)

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.json({ message: err.message, error: err })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ error: err })
})


module.exports = app
