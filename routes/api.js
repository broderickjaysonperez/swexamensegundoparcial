

var express = require('express');
var router = express.Router();

function initIncidente(db){

    var incidenteRoutes = require('./api/incidente')(db);
    router.use('/incidente', incidenteRoutes);
return router;


}

module.exports = initIncidente;
