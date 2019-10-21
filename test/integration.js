require('dotenv').config();
let {exec} = require('child_process');
let db = require("@service/domain/db");
let server = require("@src/server");

let request = require("request");

let BASE_URI = "http://" + process.env.HOST + ":" + process.env.PORT;

beforeEach(function (done) {
    this.timeout(15000);
    new Promise((resolve, reject) => {
        exec('npm run prepare-test-db', {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }).then(() => {
        done();
    });
});

afterEach(function (done) {
    this.timeout(15000);
    new Promise((resolve, reject) => {
        exec('npm run clear-test-db', {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }).then(() => {
        done();
    });
});

module.exports = {
    request,
    BASE_URI,
    db,
    server
};
