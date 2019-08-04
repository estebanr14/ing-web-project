require('../config/config');
var admin = require("firebase-admin");

var serviceAccount = require(process.env.PWD + "/keys/ing-web-database-firebase-adminsdk-r7nfi-744df0e788.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.urlDB
});

module.exports = (admin)