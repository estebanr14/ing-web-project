const express = require('express');
const app = express();


app.use(require('./test'));
app.use(require('./register-user'));
app.use(require('./login'));
app.use(require('./create-incident'));
app.use(require('./get-incident'));
module.exports = app;