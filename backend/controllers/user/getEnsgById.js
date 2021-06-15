let connection = require("../../config/db");

function GetEnsgById(res,req){
    connection.query('select enseignant.id,enseignant.nom,enseignant.prenom,enseignant.email,enseignant.tele,concat(typestructure.type," ",structure_recherche.acronyme) as structure,grade.name as grade,enseignant.specialite,enseignant.grade as idgrade,enseignant.stucture_recherche as idStructure from enseignant,structure_recherche,typestructure,grade where enseignant.stucture_recherche=structure_recherche.id and typestructure.id=structure_recherche.typeStructure and grade.id=enseignant.grade and enseignant.id=? union select enseignant.id,enseignant.nom,enseignant.prenom,enseignant.email,enseignant.tele,enseignant.stucture_recherche as structure,grade.name as grade,enseignant.specialite,enseignant.grade as idgrade,enseignant.stucture_recherche as idStructure from enseignant,grade where grade.id=enseignant.grade and enseignant.stucture_recherche is null and enseignant.id=?',[req.body.ID,req.body.ID],(err,result)=>{
        if(err || result.length==0){
            res.send({
                error:true,
                message:err?err.sqlMessage:"le ID="+req.body.ID+" ne correspond à aucun ensg"
            })
        }else{
            res.send({
                error:false,
                data:result[0]
            })
        }
    })
};

module.exports = GetEnsgById;