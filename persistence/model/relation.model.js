const {Sequelize, sequelize} = require("../connection");

const Relation = sequelize.define('relation', {
    type:{
      type: Sequelize.ENUM,
      values: ["WIFE","HUSBAND","DAUGHTER","SON","BROTHER","SISTER","FATHER","MOTHER"]
    },
    since:{
        type: Sequelize.DATE
    },
    name: {
        type: Sequelize.STRING
    },
});

module.exports = {
    Relation
};