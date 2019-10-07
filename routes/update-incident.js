
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const { verifyToken } = require('./../utils/middlewares')
const adminFirebase = require('../model/firebase')


////////////////////////////////////////////////////////////////////
//////////////////// CREATE INCIDENT ///////////////////////////////
////////////////////////////////////////////////////////////////////


app.put('/incident', async (req, res) => {

    let body = req.body



    try {


        adminFirebase.database().ref(`Incidents/${body.id}/data`).update(body, function (err) {

            if (err) {
                console.log(`Error to set  in data base:  ${err}  \n`);
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: `Error al guardar en la base de datos:  ${err}  \n`
                    }
                });
            }

            console.log(`Incident data updated to database successfully \n`)
            return res.status(200).json({
                ok: true,
                response: {
                    msg: 'Incidente actualizado exitosamente'
                }
            })
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Error interno en el servidor": ${error}`
        });
    }

});

module.exports = app;