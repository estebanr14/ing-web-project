
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


app.post('/create-incident',verifyToken, (req,res)=>{

    //req.body = { titulo , descripcion, categoria, impacto, creadoPor, asignacion, investigadores, fechaInicio, fechaCierre, estado} // header: {token}
    let body = req.body


    //Parameters validation
    if ((!body.titulo) || (!body.descripcion) || (!body.categoria) || (!body.impacto) || (!body.creadoPor)|| (!body.asignacion)|| (!body.investigadores)|| (!body.fechaInicio)|| (!body.fechaCierre)|| (!body.estado)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: {
                msg: 'Faltan argumentos en el body'
            }
        });
    }


    try {

        let incident_data = {
            id: 'Incident_'+Date.now(),
            titulo : body.titulo, 
            descripcion : body.descripcion, 
            categoria: body.categoria, 
            impacto : body.impacto, 
            creadoPor: body.creadoPor, 
            asignacion: body.asignacion, 
            investigadores : body.investigadores, 
            fechaInicio: body.fechaInicio, 
            fechaCierre: body.fechaCierre, 
            estado: body.estado
        }

        adminFirebase.database().ref(`/Incidents/${incident_data.id}`).set({ data: incident_data }, function (err) {

            if (err) {
                console.log(`Error to set  in data base:  ${err}  \n`);
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: `Error al guardar en la base de datos:  ${err}  \n`
                    }
                });
            }

            console.log(`Incident data added to database successfully \n`)
            return res.status(200).json({
                ok: true,
                response:{
                    msg: 'Incidente registrado exitosamente',
                    incident: incident_data
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