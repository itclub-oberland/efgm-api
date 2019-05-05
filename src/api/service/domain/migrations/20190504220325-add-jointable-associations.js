'use strict';

function composeTableAttributes(leftId, rightId, Sequelize) {
    let attributes = {
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        }
    };
    attributes[leftId] = {
        type: Sequelize.INTEGER,
        primaryKey: true
    };
    attributes[rightId] = {
        type: Sequelize.INTEGER,
        primaryKey: true
    };
    return attributes;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "user_role",
            composeTableAttributes("userId", "roleId", Sequelize)
        ).then(() => {
                return queryInterface.createTable(
                    "person_relation",
                    composeTableAttributes("personId", "relationId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "person_region",
                    composeTableAttributes("personId", "regionId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "person_address",
                    composeTableAttributes("personId", "addressId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "person_dossier",
                    composeTableAttributes("personId", "dossierId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "person_offer",
                    composeTableAttributes("personId", "offerId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "person_demand",
                    composeTableAttributes("personId", "demandId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "activity_person",
                    composeTableAttributes("activityId", "personId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "activity_location",
                    composeTableAttributes("activityId", "locationId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "activity_money",
                    composeTableAttributes("activityId", "moneyId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "offer_resource",
                    composeTableAttributes("offerId", "resourceId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "offer_location",
                    composeTableAttributes("offerId", "locationId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "offer_condition",
                    composeTableAttributes("offerId", "conditionId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "offer_shipping",
                    composeTableAttributes("offerId", "shippingId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "demand_resource",
                    composeTableAttributes("demandId", "conditionId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "demand_condition",
                    composeTableAttributes("demandId", "conditionId", Sequelize)
                )
            }
        ).then(() => {
                return queryInterface.createTable(
                    "condition_money",
                    composeTableAttributes("conditionId", "moneyId", Sequelize)
                )
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(
            "user_role"
        ).then(() => {
                return queryInterface.dropTable(
                    "person_relation"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "person_region"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "person_address"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "person_dossier"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "person_offer"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "person_demand"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "activity_person"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "activity_location"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "activity_money"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "offer_resource"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "offer_location"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "offer_condition"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "offer_shipping"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "demand_resource"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "demand_condition"
                );
            }
        ).then(() => {
                return queryInterface.dropTable(
                    "condition_money"
                );
            }
        );
    }
};
