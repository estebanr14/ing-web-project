
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')


////////////////////////////////////////////////////////////////////
//////////////////// GET INCIDENT //////////////////////////////////
////////////////////////////////////////////////////////////////////

app.get('/get-incident', async (req, res) => {

    let id_incident = req.query.id;

    if (!id_incident) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: {
                msg: 'Missing incident id'
            }
        });
    }

    try {

        await adminFirebase.database().ref(`/Incidents`).child(id_incident).once("value", function (snapshot) {

            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: 'Incident not found in Database'
                    }
                });
            }

            let incident = {
                id: id_incident,
                titulo: snapshot.val().data.titulo,
                descripcion: snapshot.val().data.descripcion,
                categoria: snapshot.val().data.categoria,
                impacto: snapshot.val().data.impacto,
                creadoPor: snapshot.val().data.creadoPor,
                asignacion: snapshot.val().data.asignacion,
                investigadores: snapshot.val().data.investigadores,
                fechaInicio: snapshot.val().data.fechaInicio,
                fechaCierre: snapshot.val().data.fechaCierre,
                estado: snapshot.val().data.estado
            }

            return res.status(200).json({
                ok: true,
                response: {
                    msg: 'login successfully',
                    incident
                }

            });
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Internal server error": ${error}`
        });
    }

});

module.exports = app;