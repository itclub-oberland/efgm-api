const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./efgm.db');
const Op = Sequelize.Op;

module.exports = {
  Sequelize,
  sequelize,
  Op
};