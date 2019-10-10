'use strict';

////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

require('../config/config');
const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////
////////////////////////// LOGIN ///////////////////////////////////
////////////////////////////////////////////////////////////////////

app.post('/login', async (req, res) => {

    //req.body = {userName , password} //Headers:token
    let body = req.body

    //Parameters validation
    if ((!body.userName) || (!body.password)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: {
                msg: 'Faltan argumentos en el body'
            }
        });
    }

    try {

        await adminFirebase.database().ref(`/Users`).child(body.userName).once("value", function (snapshot) {
            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    response:{
                        msg: 'Usuario no encontrado en la base de datos'
                    }
                });
            } else {
                let hash = sha256.x2(body.password);
                if (hash == snapshot.val().data.password) {

                    console.log('Login successful');

                    let jwtoken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        user: body.userName,
                        role: snapshot.val().data.role
                    }, 'ing-web-secret');

                    let user = {
                        name: snapshot.val().data.name,
                        userName: body.userName,
                        role: snapshot.val().data.role,
                        email: snapshot.val().data.email,
                        id_provider: snapshot.val().data.id_provider,
                        jwtoken
                    }

                    if (snapshot.val().data.id_investigator){
                        user.id_investigator = snapshot.val().data.id_investigator
                    }

                    return res.status(200).json({
                        ok: true,
                        response: {
                            msg: 'Login exitoso',
                            user
                        }

                    });

                } else {
                    return res.status(400).json({
                        ok: false,
                        response:{
                            msg: 'Contraseña inválida'
                        }
                    });
                }
            }
        });




    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Error interno en el servidor": ${error}`
        });

    }
});


module.exports = app;
