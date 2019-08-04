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

app.post('/login', async (req, res) => {

    //req.body = {email , password} //Headers:token
    let body = req.body

    //Parameters validation
    if ((!body.email) || (!body.password)) {
        console.error(`Failed to send transaction: Missing arguments\n`);
        return res.status(400).json({
            ok: false,
            response: 'Missing arguments in request body'
        });
    }

    try {

        //logic

        let jwt

        return res.status(200).json({
            ok: true,
            message: 'login successfully',
            jwt
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Internal server error": ${error}`
        });

    }
});


module.exports = app;