
////////////////////////////////////////////////////////////////////
////////////////////////// IMPORTS /////////////////////////////////
////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const adminFirebase = require('../model/firebase')


////////////////////////////////////////////////////////////////////
//////////////////// GET SUPERVISORS ///////////////////////////////
////////////////////////////////////////////////////////////////////

app.get('/supervisors', async (req, res) => {

    
    try {

        await adminFirebase.database().ref(`/Users`).once("value", function (snapshot) {

            if (snapshot.val() == null) {
                return res.status(400).json({
                    ok: false,
                    response: {
                        msg: 'Users no encontrados en la base de datos'
                    }
                });
            }

            // console.log(snapshot.val())
            let users = snapshot.val();
            let supervisors = []

            for(var i in users){
                if(users[i].data.role == 'supervisor'){
                    supervisors.push(users[i].data)
                }
                
              }

            return res.status(200).json({
                ok: true,
                response: {
                    msg: 'Búsqueda exitosa',
                    supervisors
                }

            });
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            response: `Error interno en el servidor": ${error}`
        });
    }

});

module.exports = app;