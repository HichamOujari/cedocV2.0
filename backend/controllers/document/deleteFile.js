let connection = require("../../config/db");
const exec = require("../exec")

async function DeleteFile (res,req){
    
    const idDocument = req.body.idDoc;
    try{
        var rslt;
        rslt = await exec('delete from document where id=?',[idDocument])
        if(rslt.error==true || rslt.length==0){
            res.send({
                error:true,
                message:rslt.messgae.sqlMessage
            })
        }else{
            //const idThese = rslt[0].id
             res.send({
                message:"done",
                error:false
            })
        }
    }catch(err){
        res.send({
            message:err.message.sqlMessage,
            error:true
        })
    }
};

module.exports = DeleteFile;