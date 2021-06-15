let connection = require("../../config/db");

const getDoctInfos = (res,req)=>
{
    const userID = req.body.userID;
    connection.query("select concat(nom,' ',prenom) as nom,doctorant.NumDoss as numDoss,doctorant.CNE from doctorant,user where user.idUser=doctorant.id and user.id=?",[userID],(err,result)=>{
        if(err){
            res.send({
                error:true,
                errorSystem:true
            })
        }else if(result.length==1){
            res.send(result[0]);
        }else{
            res.send({
                error : true,
                errorSystem:false,
            });
        }
    })
};


module.exports = getDoctInfos;