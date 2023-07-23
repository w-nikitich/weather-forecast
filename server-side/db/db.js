const { Sequelize } = require("sequelize");
const { Client } = require('pg');
require('dotenv').config();


const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
};

const sequelize = new Sequelize('weather_forecast', process.env.DB_USER, process.env.DB_PASSWORD, {dialect: 'postgres'});

module.exports = {sq: sequelize, testDbConnection};