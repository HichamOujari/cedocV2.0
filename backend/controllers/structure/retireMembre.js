let connection = require("../../config/db");

const RetireMembre = (res,req)=>
{
    var query = "update stucture_recherche set stucture_assoc=null where id="+req.body.IDStruct
    var rslt
    if(req.body.IDUser!=undefined){
        query = "update enseignant set stucture_recherche = null where id="+req.body.IDUser
        connection.query("update user set type=2 where idUser="+req.body.IDUser,(err,result)=>{
            if(err){
                res.send({
                    error : true,
                    err:err,
                });
            }else{
                rslt=result
            }
        })
    }
    connection.query(query,(err,result)=>{
        if(err){
                res.send({
                    error : true,
                    err:err,
                });
        }else{
            res.send({
                error : false,
                data:rslt.changedRows,
            });
        }
    })
};

module.exports = RetireMembre;