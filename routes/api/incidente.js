var express = require('express');
var router = express.Router();
//3
var ObjectID =require('mongodb').ObjectID;



function initIncidente(db){

    var incidenteColl =db.collection('incidente');
    router.get('/',(req, res, next)=>{
       



        
//3.............................===============

    incidenteColl.find().toArray((err , incidente)=>{
        if(err){
            console.log(err);
            return res.status(404).json({"error":"error al extraer incidente de la base"})
        }
            return res.status(200).json(incidente);
    });
    
    });//get all
    

//==============3================================== 
router.get('/:id',(req,res, next)=>{

var id =new ObjectID(req.params.id);
incidenteColl.findOne({"_id": id} , (err, doc)=>{
if(err){
    console.log(err);
    return res.status(404).json({"error":"nose puede obtener incidente"});
}

return res.status(200).json(doc);
});//findone

});// 3//id


router.post('/',(req, res, next ) =>{
var newincidente = Object.assign({},
    {
    "descripcion":'',
    "fechaHora":new Date().getTime(),
    "estado":"",
    "usuarioregistra":'',
    "usuarioasignado" : "",
    "fechaCreated": new Date().getTime(),
    "fechaCerrado": new Date().getTime()
    
    },
    req.body
    );

    //insertar 
    incidenteColl.isertOne(newincidente,(err, rslt)=>{
    if(err){
    console.log(err);
    return res.status(404).json({"error":"Agrega nuevo incidente"});
    }
        if(rslt.ops.length===0){
        console.log(rslt);
        return res.status(404).json({"error":"Agrega nuevo incidente"});
    
        }
return res.status(200).json(rslt.ops[0]);

    });

});//post

router.put('/:id',(req, res, nex)=>{
var query = {"_id":new ObjectID(req.params.id)};
var update ={"$inc":{"views":1, "likes":"1"}};

incidenteColl.updatesOne(query ,update,(err ,rslt)=>{

    if(err){
        console.log(err);
        return res.status(404).json({"error":"no se pudo modificar nueva incidente"});
        }
            if(rslt.ops.length===0){
            console.log(rslt);
            return res.status(404).json({"error":"no se pudo modificar nueva incidente"});
        
            }
    return res.status(200).json(rslt.ops[0]);
    
        

});
router.delete('/:id',(req, res, nex)=>{
    var query = {"_id":new ObjectID(req.params.id)};
  
    
    incidenteColl.removeOne(query ,(err ,rslt)=>{
    
        if(err){
            console.log(err);
            return res.status(404).json({"error":"no se pudo eliminar nueva incidente"});
            }
                if(rslt.ops.length===0){
                console.log(rslt);
                return res.status(404).json({"error":"no se pudo eliminar nueva incidente"});
            
                }
        return res.status(200).json(rslt.ops[0]);
        
            
    
    });


});






return router;
}
module.exports = initIncidente;//ver

