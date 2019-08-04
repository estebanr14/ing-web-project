const express = require('express');
const app = express();


app.use(require('./test'));
app.use(require('./register-user'));
app.use(require('./login'));
module.exports = app;