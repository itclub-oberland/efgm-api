'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "user_role", [
                {
                    userId: 1,
                    roleId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userId: 1,
                    roleId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("user_role", null, {});
    }
};
