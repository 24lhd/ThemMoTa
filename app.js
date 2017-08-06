var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var fs = require('fs');
var motangan = require('./mongo/moTa')
app.use('/', index);
app.use('/users', users);
app.get('/today', function (req, res) {
    var date = new Date();
    var path = date.toISOString().split("Z")[0].split("T");
    pubDate = {
        phut: path[1].split(":")[1],
        gio: path[1].split(":")[0],
        thang: path[0].split("-")[1],
        ngay: path[0].split("-")[2],
        nam: path[0].split("-")[0],
    }
    var query = {
        "pubDate.ngay": pubDate.ngay,
        "pubDate.thang": pubDate.thang,
        "pubDate.nam": pubDate.nam
    }
    motangan.findQuery(query, function (result) {
        fileName = __dirname + "/public/" + `${pubDate.ngay}-${pubDate.thang}-${pubDate.nam}` + ".json"
        fs.writeFile(fileName, JSON.stringify(result), function (err) {//var fs = require('fs');
            if (err) {
                return console.log(err);
            }
            console.log(query);
            res.download(fileName);
        });
    })


});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
