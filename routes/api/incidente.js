

var express = require('express');
var router = express.Router();

function initIncidente(db){

    var incidenteColl = db.collection('incidente');
router.get('/',(req, res ,next)=>{
    res.status(200).json({"api":"1"});
});

    
return router;


}

module.exports = initIncidente;
