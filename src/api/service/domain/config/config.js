module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "./src/resource/db/efgm_dev.sqlite",
        "logging": console.log
    },
    "test": {
        "dialect": "sqlite",
        "storage": "./src/resource/db/efgm_test.sqlite",
        "logging": false
    },
    "production": {
        "dialect": "sqlite",
        "storage": "./src/resource/db/efgm.sqlite",
        "logging": false
    }
};
