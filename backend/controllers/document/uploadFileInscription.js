let connection = require("../../config/db");
const exec = require("../exec")
const fs = require("fs")

async function uploadFileInscription (res,req){
    
    const idUser = req.body.idUser;
    var files  = []
    Object.keys(req.files).map(ele=>files = [...files,req.files[ele]])

    try{
        var rslt;
        rslt = await exec('select these.id from these,user where user.idUser=these.DoctorantID and user.id=?',[idUser])
        if(rslt.error==true || rslt.length==0){
            res.send({
                error:true,
                message:rslt.messgae.sqlMessage
            })
        }else{
            const idThese = rslt[0].id
            await files.map(async (ele,index)=>{
                await ele.mv("./uploads/"+ele.name);
                var binaryData = await fs.readFileSync("./uploads/"+ele.name);
                var base64 = new Buffer(binaryData).toString("base64");
                base64="data:"+ele.mimetype+";base64,"+base64;
                fs.rm("./uploads/"+ele.name,(err) => {
                    if(err){
                        // File deletion failed
                        console.error(err.message);
                        return;
                    }
                    console.log("File deleted successfully");
                    
                });
                rslt = await exec('insert into document values(null,?,?,?)',[ele.name,base64,idThese])
                if(rslt.error===true){
                    res.send({
                        error:true,
                        message:rslt.messgae.sqlMessage
                    })
                }
            })
            rslt = await exec("update these set  EtatIsncription=1 where id=?",[idThese])
            if(rslt.error===true){
                res.send({
                    error:true,
                    message:rslt.messgae.sqlMessage
                })
            }else{
                res.send({
                    error:false,
                    message:"done with success!"
                })
            }
        }
    }catch(err){
        res.send({
            message:err.message.sqlMessage,
            error:true
        })
    }
};

module.exports = uploadFileInscription;