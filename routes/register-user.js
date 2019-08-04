'use strict';

////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

require('../config/config');
const express = require('express');
const app = express();

////////////////////////////////////////////////////////////////////
////////////////////////// TEST ////////////////////////////////////
////////////////////////////////////////////////////////////////////

app.post('/register-user', async (req, res) => {

    //req.body = {name , email , password , role, id_provider   } //Headers:token
    let body = req.body

    //Parameters validation
    if ((!body.name) || (!body.email) || (!body.password) || (!body.role) || (!body.id_provider)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: 'Missing arguments in request body'
        });
    }

    try {

        //logic

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