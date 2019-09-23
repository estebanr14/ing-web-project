
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
    if ((!body.title) || (!body.description) || (!body.category) || (!body.impact) || (!body.createdBy)|| (!body.start_date)||  (!body.state)) {
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
            title : body.title, 
            description : body.description, 
            category: body.category, 
            impact : body.impact, 
            createdBy: body.createdBy, 
            assigned: "", 
            investigator : "", 
            start_date: body.start_date, 
            end_date: "", 
            state: body.state
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