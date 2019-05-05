require('dotenv').config();

let chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

let request = require("request");

let BASE_URI = "http://" + process.env.HOST + ":" + process.env.PORT;


let dbConfig = require("../src/api/service/domain/dbConfig");

module.exports = {
    request,
    chai,
    expect,
    should,
    dbConfig,
    BASE_URI
};