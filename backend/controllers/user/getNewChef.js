let connection = require("../../config/db");

const GetNewChef = (res,req)=>
{
    connection.query('select enseignant.id, concat(enseignant.nom," ",enseignant.prenom) as nom from enseignant,user where user.idUser=enseignant.id and user.type=2 and enseignant.stucture_recherche is null',(err,result)=>{
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

module.exports = GetNewChef;