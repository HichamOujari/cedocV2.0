let connection = require("../../config/db");

const GetNewMemberToAdd = (res,req)=>
{
    var type = req.body.type
    var query;
    if(type.includes("ensg")){
    	query = "select enseignant.id,concat(enseignant.nom,' ',enseignant.prenom) as nom from enseignant where enseignant.stucture_recherche is NULL"
    }else if(type.includes("equipe")){
    	query = "select structure_recherche.id,structure_recherche.acronyme as nom from structure_recherche where structure_recherche.structure_assoc is NULL and structure_recherche.typeStructure=1"
    }else if(type.includes("labo")){
    	query="select structure_recherche.id,structure_recherche.acronyme as nom from structure_recherche where structure_recherche.structure_assoc is NULL and structure_recherche.typeStructure=2"
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
                data:result,
            });
        }
    })
};

module.exports = GetNewMemberToAdd;