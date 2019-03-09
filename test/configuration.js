require('dotenv').config();
let chai = require('chai')
    , expect = chai.expect
    , should = chai.should();

let request = require("request");

let BASE_URI = "http://" + process.env.HOST + ":" + process.env.PORT;

module.exports = {
    request,
    chai,
    expect,
    should,
    BASE_URI
};