let connection = require("../../config/db");
const exec = require("../exec")

async function IsRegistred(res,req){


    try{
        var rslt = await exec('select count(*) as isRegistred from document,these,user where document.idThese=these.id and user.idUser=these.DoctorantID and user.id=?',[req.body.userID])
            if(rslt.error==true || rslt.length==0){
                res.send({
                    error:true,
                    message:rslt.messgae.sqlMessage
                })
            }else{
                if(rslt[0].isRegistred===0){
                    res.send({
                        isRegistred:false,
                        data:rslt[0].isRegistred
                    })
                }else{
                    res.send({
                        isRegistred:true,
                        data:rslt[0].isRegistred
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

module.exports = IsRegistred;