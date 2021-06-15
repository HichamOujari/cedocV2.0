let connection = require("../../config/db");
const exec = require("../exec")

async function AddStructure (res,req){
    const nom = req.body.nom
    const acronyme = req.body.acronyme;
    const date = req.body.date;
    const chef = req.body.chef=="null"?null:req.body.chef;
    const theme = req.body.theme;
    const type=req.body.type
    try{
        var rslt = await exec('insert into structure_recherche values(null,?,?,?,?,?,null)',[nom,type,acronyme,date,theme])
        if(rslt.error===true){
            res.send({
                error:true,
                message:rslt.messgae.sqlMessage
            })
        }else{
            const idStruct = rslt.insertId
            if(chef!=null){
                var rslt = await exec('update user set type=1 where idUser=?',[chef])
                if(rslt.error===true){
                    res.send({
                        error:true,
                        message:rslt.messgae.sqlMessage
                    })
                }else{
                    var rslt = await exec('update enseignant set stucture_recherche=? where id=?',[idStruct,chef])
                    if(rslt.error===true){
                        res.send({
                            error:true,
                            message:rslt.messgae.sqlMessage
                        })
                    }
                }
            }
            res.send({
                error:false,
                message:"succ"
            })
        }
    }catch(err){
        res.send({
            message:err.message.sqlMessage,
            error:true
        })
    }
};

module.exports = AddStructure;