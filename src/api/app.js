//check package.json for alias paths (@somepath etc.)
require('module-alias/register');
let express = require('express');
let path = require('path');
let fs = require('fs');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const expressOasGenerator = require('express-oas-generator');
const HTTP_STATUS = require('http-status-codes');

const LOGGER = require("./util/logger");
require("./service/domain/config").init();

let indexRouter = require('./rest/endpoins/api-docs');
let apiRouter = require('./rest/endpoins/api');
let authRouter = require('./rest/endpoins/authentication');

let app = express();

//Setup to generate a swagger config file
//Serves as a starter for a more extended description
//of the API (autogenerated)
expressOasGenerator.init(app,
    function (spec) {
        return spec;
    },
    'src/resource/efgm-api.swagger.json',
    60 * 1000);

//Setup logger
// create a write stream (in append mode)

if (!fs.existsSync(path.join(__dirname, '../resource/log'))) {
    fs.mkdirSync(path.join(__dirname, '../resource/log'), {recursive: true});
}

let accessLogStream = fs.createWriteStream(path.join(__dirname, '../resource/log/access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../resource/static')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Something went wrong! Sorry!"});
    LOGGER.error("Server error: ", {exception: err, request: req.url});
});

module.exports = app;
