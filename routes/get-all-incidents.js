
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')


////////////////////////////////////////////////////////////////////
//////////////////// GET INCIDENT //////////////////////////////////
////////////////////////////////////////////////////////////////////

app.get('/incidents', async (req, res) => {

    
    try {

        await adminFirebase.database().ref(`/Incidents`).once("value", function (snapshot) {

            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: 'Incidentes no encontrados en la base de datos'
                    }
                });
            }

            // console.log(snapshot.val())
            let json_data = snapshot.val();
            let incidents = []

            for(var i in json_data){

                incidents.push(json_data [i].data)
              }

            return res.status(200).json({
                ok: true,
                response: {
                    msg: 'Búsqueda exitosa',
                    incidents
                }

            });
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Error interno en el servidor": ${error}`
        });
    }

});

module.exports = app;