require('../config/config');

const jwt = require('jsonwebtoken');
const sha256 = require('sha256')


// =====================
// Verificar Token
// =====================
let verifyAdminToken = (req, res, next) => {

    let token = req.get('token');
    //let token = req.body.token;

    jwt.verify(token, 'ing-web-secret', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                response: {
                    msg: 'Invalid token'
                }
            });
        }

        if (decoded.role != 'admin'){
            return res.status(401).json({
                ok: false,
                response: {
                    msg: 'Role must be admin'
                }
            });
        }

        //req.usuario = decoded.usuario;

        next();

    });



};

let verifyToken = (req, res, next) => {

    let token = req.get('token');
    //let token = req.body.token;

    jwt.verify(token, 'ing-web-secret', (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                response: {
                    msg: 'Invalid token'
                }
            });
        }

        if (decoded.role == 'admin' || decoded.role == 'user'){
            next();
        }else{
            return res.status(401).json({
                ok: false,
                response: {
                    msg: 'Role must be admin or user'
                }
            });
        }

        

        //req.usuario = decoded.usuario;

        

    });



};




module.exports = {
    verifyAdminToken,
    verifyToken
};