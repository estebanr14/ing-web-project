const express = require('express');
const app = express();


app.use(require('./test'));
app.use(require('./register-user'));
app.use(require('./login'));
app.use(require('./create-incident'));
app.use(require('./get-incident'));
app.use(require('./get-all-incidents'));
app.use(require('./get-supervisor'))
module.exports = app;