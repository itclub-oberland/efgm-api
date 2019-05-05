'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "users",
            [
                {
                    username: "admin",
                    password: "admin",
                    status: "ACTIVE",
                    activeSince: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("users", null, {});
    }
};
