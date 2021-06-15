let connection = require("../../config/db");

const GetEnsg = (res,req)=>{

    const userid = req.query.userid
    var isSpecifiedAccount = "";
    if(userid!=undefined){
        isSpecifiedAccount = " and enseignant.stucture_recherche IN (select enseignant.stucture_recherche from user,enseignant where user.idUser=enseignant.id and user.id="+userid+")"
    }
    connection.query('select enseignant.id,enseignant.nom, enseignant.prenom, enseignant.email, enseignant.tele, concat(typestructure.type," ",structure_recherche.acronyme) as structure, grade.name as grade from  enseignant, structure_recherche, typestructure, grade,user where enseignant.stucture_recherche=structure_recherche.id and user.idUser=enseignant.id and user.type!=0 and typestructure.id=structure_recherche.typeStructure and grade.id=enseignant.grade '+isSpecifiedAccount+' union SELECT enseignant.id, enseignant.nom, enseignant.prenom, enseignant.email, enseignant.tele, enseignant.stucture_recherche, grade.name as grade from enseignant,grade,user where user.idUser=enseignant.id and enseignant.grade=grade.id and enseignant.stucture_recherche is null and user.type!=0'+isSpecifiedAccount,(err,result)=>{
        if(err){
            console.log(err)
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

module.exports = GetEnsg;