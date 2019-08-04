'use strict';

////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

require('../config/config');
const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase') 
const sha256 = require('sha256')

////////////////////////////////////////////////////////////////////
////////////////////////// TEST ////////////////////////////////////
////////////////////////////////////////////////////////////////////

app.post('/register-user', async (req, res) => {

    //req.body = {userName , email , password , role, id_provider   } //Headers:token
    let body = req.body

    //Parameters validation
    if ((!body.userName) || (!body.email) || (!body.password) || (!body.role) || (!body.id_provider)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: 'Missing arguments in request body'
        });
    }

    try {

        //logic

        let data = {
            name: body.userName,
            email:body.email,
            password: sha256.x2(body.password),
            role: body.role,
            id_provider: body.id_provider

        }

        adminFirebase.database().ref(`/Users/${body.userName}`).set({ data: data }, function (err) {

            if (err) return console.log(`Error to set  in data base:  ${err}  \n`)
            return console.log(`Data added to database successfully \n`)
        });


        return res.status(201).json({
            ok: true,
            message: 'Registered user successfully'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Internal server error": ${error}`
        });

    }
});


module.exports = app;