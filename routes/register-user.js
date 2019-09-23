'use strict';

////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

require('../config/config');
const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')
const sha256 = require('sha256')
const { verifyAdminToken } = require('./../utils/middlewares')


////////////////////////////////////////////////////////////////////
//////////////////// REGISTER USER /////////////////////////////////
////////////////////////////////////////////////////////////////////

app.post('/register-user', verifyAdminToken, async (req, res) => {

    //req.body = {userName , email , password , role, id_provider   } //Headers:token
    let body = req.body


    //Parameters validation
    if ((!body.userName) || (!body.email) || (!body.password) || (!body.role) || (!body.id_provider)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ////////////////////////////////////////////////////////////////////
//////////////////// REGISTER USER /////////////////////////////////
////////////////////////////////////////////////////////////////////ok: false,
            response: {
                msg: 'Faltan argumentos en el Body'
            }
        });
    }

    try {

        //logic

        let data = {
            name: body.userName,
            email: body.email,
            password: sha256.x2(body.password),
            role: body.role,
            id_provider: body.id_provider

        }

        if(body.role === 'investigador'){
            data.id_investigator = Date.now();
        }

        adminFirebase.database().ref(`/Users/${body.userName}`).set({ data: data }, function (err) {

            if (err) {
                console.log(`Error to set  in data base:  ${err}  \n`);
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: `Error al guardar en la base de datos  ${err}  \n`
                    }
                });
            }

            console.log(`Data added to database successfully \n`)
            return res.status(200).json({
                ok: true,
                response:{
                    msg: 'Usuario registrado exitosamente'
                }   
            })
        });


       

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: {
                msg:  `Error interno del servidor": ${error}`
            }
        });

    }
});



module.exports = app;
