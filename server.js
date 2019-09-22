require('./config/config');

const express = require('express');//Importa el módulo express
const bodyParser = require('body-parser'); //Importa el módulo body-parser
const routes = require('./routes/index');  //Importa el repertorio de rutas
const cors = require('cors');



//Inicializa express
var app = express();

app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



//Crea el servidor por el puerto port
var port = process.env.PORT;
app.listen(port, () => {
    console.log('*** Server is up and runnign on port number ' + port + '\n');
});


//Configuración global de rutas
app.use(routes);
