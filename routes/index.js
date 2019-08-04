const express = require('express');
const app = express();


app.use(require('./test'));
module.exports = app;