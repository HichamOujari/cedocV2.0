let connection = require("../../config/db");
const exec = require("../exec")

async function DeleteStruct(res,req){
    try{
        var rslt = await exec('delete from structure_recherche where id=?',[req.body.ID])
        if(rslt.error===true){
            res.send({
                error:true,
                message:rslt.messgae.sqlMessage
            })
        }else{
                var rslt = await exec('update user set type=2 where user.type=1 and idUser in  (select id from enseignant where enseignant.stucture_recherche=?)',[req.body.ID])
                if(rslt.error===true){
                    res.send({
                        error:true,
                        message:rslt.messgae.sqlMessage
                    })
                }else{
                    var rslt = await exec('update enseignant set stucture_recherche=null where stucture_recherche=?',[req.body.ID])
                    if(rslt.error===true){
                        res.send({
                            error:true,
                            message:rslt.messgae.sqlMessage
                        })
                    }else{
                        res.send({
                            error:false,
                            message:"succ"
                        })
                    }
                }
            
        }
    }catch(err){
        res.send({
            message:err.message.sqlMessage,
            error:true
        })
    }
};

module.exports = DeleteStruct;