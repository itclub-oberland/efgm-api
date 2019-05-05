'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Username needs to be longer than 3 characters."
                    },
                    notEmpty: {
                        msg: "Please enter a username"
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "You need to set a password!"
                    }
                }
            },
            status: {
                type: Sequelize.ENUM,
                values: ["ACTIVE", "PASSIVE", "INITIAL"]
            },
            activeSince: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};