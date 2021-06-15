let connection = require("../../config/db");

const GetStructureByType = (res,req)=>
{
    connection.query("SELECT structure_recherche.id,structure_recherche.nom,structure_recherche.acronyme,date_format(structure_recherche.dateCreation,'%Y-%m-%d') as date, structure_recherche.theme,concat(enseignant.nom,' ',enseignant.prenom) as chef from enseignant,user,structure_recherche where structure_recherche.id=enseignant.stucture_recherche and enseignant.id=user.idUser and user.type=1 and structure_recherche.typeStructure=? union select structure_recherche.id,structure_recherche.nom,structure_recherche.acronyme,date_format(structure_recherche.dateCreation,'%Y-%m-%d') as date, structure_recherche.theme,null as chef from structure_recherche where structure_recherche.typeStructure=? and structure_recherche.id not in (SELECT structure_recherche.id from enseignant,user,structure_recherche where structure_recherche.id=enseignant.stucture_recherche and enseignant.id=user.idUser and user.type=1 and structure_recherche.typeStructure=?)",[req.body.type,req.body.type,req.body.type],(err,result)=>{
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

module.exports = GetStructureByType;