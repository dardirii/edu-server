const mongoose = require('mongoose');
const {dbHost, dbPass, dbName, dbPort, dbUser } = require('../app/config');

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', () => console.log('mongoose connected'))

module.exports = db;