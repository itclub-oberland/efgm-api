'use strict';
const bcrypt = require("bcrypt");

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "users",
            [
                {
                    id: 1,
                    username: "admin",
                    password: encryptPassword("admin"),
                    status: "ACTIVE",
                    activeSince: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    }
};
