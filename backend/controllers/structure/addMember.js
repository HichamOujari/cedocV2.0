let connection = require("../../config/db");

const AddMember = (res,req)=>
{
    const type = req.body.type
    const idMembre = req.body.idMembre
    const IdStruct = req.body.IdStruct
    var query;
    if(type.includes("ensg")){
        query="update enseignant set enseignant.stucture_recherche="+IdStruct+" where id="+idMembre
    }else{
        query="UPDATE structure_recherche set structure_assoc="+IdStruct+" where structure_recherche.id="+idMembre
    }
    
    connection.query(query,(err,result)=>{
        if(err){
            res.send({
                error:true,
                message:err
            })
        }else{
            res.send({
                error : false,
                data:"done",
            });
        }
    })
};

module.exports = AddMember;