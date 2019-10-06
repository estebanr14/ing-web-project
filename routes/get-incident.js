
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')


////////////////////////////////////////////////////////////////////
//////////////////// GET INCIDENT //////////////////////////////////
////////////////////////////////////////////////////////////////////

app.get('/incident/:id', async (req, res) => {

    let id_incident = req.params.id

    if (!id_incident) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: {
                msg: 'Falta el id en el request'
            }
        });
    }

    try {

        await adminFirebase.database().ref(`/Incidents`).child(id_incident).once("value", function (snapshot) {

            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: 'Incidente no encontrado en la base de datos'
                    }
                });
            }

            console.log(snapshot.val())

            // let incident = {
            //     id: id_incident,
            //     titulo: snapshot.val().data.titulo,
            //     descripcion: snapshot.val().data.descripcion,
            //     categoria: snapshot.val().data.categoria,
            //     impacto: snapshot.val().data.impacto,
            //     creadoPor: snapshot.val().data.creadoPor,
            //     asignacion: snapshot.val().data.asignacion,
            //     investigadores: snapshot.val().data.investigadores,
            //     fechaInicio: snapshot.val().data.fechaInicio,
            //     fechaCierre: snapshot.val().data.fechaCierre,
            //     estado: snapshot.val().data.estado
            // }

            return res.status(200).json({
                ok: true,
                response: {
                    msg: 'Búsqueda exitosa',
                    incident: snapshot.val().data
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