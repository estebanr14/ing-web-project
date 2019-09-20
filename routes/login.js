'use strict';

////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

require('../config/config');
const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')
const sha256 = require('sha256')
var jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////
////////////////////////// TEST ////////////////////////////////////
////////////////////////////////////////////////////////////////////

app.post('/login', async(req, res) => {

    //req.body = {userName , password} //Headers:token
    let body = req.body

    //Parameters validation
    if ((!body.userName) || (!body.password)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: 'Missing arguments in request body'
        });
    }

    try {

        adminFirebase.database().ref(`/Users`).child(body.userName).once("value", function(snapshot) {
            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'User not found in Database'
                    }
                });
            } else {
                let hash = sha256.x2(body.password);
                if (hash == snapshot.val().data.password) {
                    console.log('Login successful')
                } else {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: `Invalid password`
                        }
                    });
                }
            }
        });


        let jwtoken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: body.userName
        }, 'secret');

        return res.status(200).json({
            ok: true,
            message: 'login successfully',
            user: {
                jwtoken
            }
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Internal server error": ${error}`
        });

    }
});


module.exports = app;