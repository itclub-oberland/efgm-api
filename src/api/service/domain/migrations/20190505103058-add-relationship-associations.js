'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "relations",
            "personId",
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "people",
                    key: "id"
                }
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "relations",
            "personId"
        )
    }
};
