// Defines global dependencies for tests
require('module-alias/register');
let chai = require('chai');

global.expect = chai.expect;
global.should = chai.should();
global.assert = chai.assert;

process.env.NODE_ENV = 'test';
