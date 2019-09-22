
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const { verifyToken } = require('./../utils/middlewares')

////////////////////////////////////////////////////////////////////
//////////////////// CREATE INCIDENT ///////////////////////////////
////////////////////////////////////////////////////////////////////


app.post('/create-incident',verifyToken, (req,res)=>{

    //req.body = {id, titulo , descripcion, categoria, impacto, creadoPor, asignacion, investigadores, fechaInicio, fechaCierre, estado} // header: {token}
    let body = req.body


    //Parameters validation
    if ((!body.id) || (!body.titulo) || (!body.descripcion) || (!body.categoria) || (!body.impacto) || (!body.creadoPor)|| (!body.asignacion)|| (!body.investigadores)|| (!body.fechaInicio)|| (!body.fechaCierre)|| (!body.estado)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: {
                msg: 'Missing arguments in request body'
            }
        });
    }


    try {

        let incident_data = {
            id: body.id,
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
        
    } catch (error) {
        
    }

});

module.exports = app;