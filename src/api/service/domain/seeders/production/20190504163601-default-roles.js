'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("roles", [
            {name: "ROLE_USER", createdAt: new Date(), updatedAt: new Date()},
            {name: "ROLE_ADMIN", createdAt: new Date(), updatedAt: new Date()},
            {name: "ROLE_GM", createdAt: new Date(), updatedAt: new Date()},
            {name: "ROLE_LV", createdAt: new Date(), updatedAt: new Date()},
            {name: "ROLE_VOLUNTEER", createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkDelete("roles", null, {});
    }
};
