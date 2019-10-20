'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("roles", [
            {id:1, name: "ROLE_USER", createdAt: new Date(), updatedAt: new Date()},
            {id:2, name: "ROLE_ADMIN", createdAt: new Date(), updatedAt: new Date()},
            {id:3, name: "ROLE_GM", createdAt: new Date(), updatedAt: new Date()},
            {id:4, name: "ROLE_LV", createdAt: new Date(), updatedAt: new Date()},
            {id:5, name: "ROLE_VOLUNTEER", createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface
            .bulkDelete("roles", null, {});
    }
};
