const mongoose = require('mongoose');
const {dbHost, dbPass, dbName, dbPort, dbUser } = require('../app/config');

mongoose.connect(`mongdb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
const db = mongoose.connection;

module.exports = db;