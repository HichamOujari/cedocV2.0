let connection = require("../../config/db");

const getEnsgAccountInfos = (res,req)=>
{
    const userID = req.body.userID;
    
    connection.query("select structure_recherche.acronyme as nom,structure_recherche.id as structId from structure_recherche,user,enseignant WHERE user.idUser=enseignant.id and enseignant.stucture_recherche=structure_recherche.id and user.id=?",[userID],(err,result)=>{
        if(err){
            res.send({
                error:true,
                errorSystem:true
            })
        }else if(result.length==1){
            res.send({
                error:false,
                data:result[0],
            });
        }else{
            res.send({
                error : true,
                errorSystem:false,
            });
        }
    })
};


module.exports = getEnsgAccountInfos;