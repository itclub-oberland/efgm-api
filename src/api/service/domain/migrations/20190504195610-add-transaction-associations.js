'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "transactions",
            "sellerId",
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "people",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL"
            }
        ).then(() => {
                return queryInterface.addColumn(
                    "transactions",
                    "buyerId",
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "people",
                            key: "id"
                        },
                        onUpdate: "CASCADE",
                        onDelete: "SET NULL"
                    }
                )
            }
        ).then(() => {
                return queryInterface.addColumn(
                    "transactions",
                    "offerId",
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "offers",
                            key: "id"
                        },
                        onUpdate: "CASCADE",
                        onDelete: "SET NULL"
                    }
                )
            }
        ).then(() => {
                return queryInterface.addColumn(
                    "transactions",
                    "demandId",
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: "demands",
                            key: "id"
                        },
                        onUpdate: "CASCADE",
                        onDelete: "SET NULL"
                    }
                )
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            "transactions",
            "sellerId"
        ).then(() => {
                return queryInterface.removeColumn(
                    "transactions",
                    "buyerId"
                )
            }
        ).then(() => {
                return queryInterface.removeColumn(
                    "transactions",
                    "offerId"
                )
            }
        ).then(() => {
                return queryInterface.removeColumn(
                    "transactions",
                    "demandId"
                )
            }
        )
    }
};
