let connection = require("../../config/db");
const exec = require("../exec")

async function DeleteEnsg(res,req){
    try{
        var rslt = await exec('delete from enseignant where id=?',[req.body.ID])
        if(rslt.error===true || rslt.affectedRows==0){
            res.send({
                error:true,
                message:rslt.affectedRows==0?"une erreur s'est produite, veuillez réessayer ultérieurement":rslt.message.sqlMessage
            })
        }else{
            rslt = await exec('delete from user where idUser=?',[req.body.ID])
            if(rslt.error===true){
                res.send({
                    error:true,
                    message:rslt
                })
            }else{
                res.send({
                    error:false,
                    message:"succ"
                })
            }
        }
    }catch(err){
        res.send({
            message:err,
            error:true
        })
    }

};

module.exports = DeleteEnsg;