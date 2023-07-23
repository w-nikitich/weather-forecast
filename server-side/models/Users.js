const {sq} = require('../db/db');
const {DataTypes} = require('sequelize');

const Users = sq.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false    
    }
});

Users.sync().then(() => {
    console.log("Users Model synced");
});

module.exports = Users;