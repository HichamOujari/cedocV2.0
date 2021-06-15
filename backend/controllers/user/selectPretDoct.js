let connection = require("../../config/db");

const DoctPreselected = (res,req)=>{   
    const id = req.body.id
    const encadrant = req.body.encadrant
    const coEncadrant = req.body.coencadrant
    const cmd = req.body.cmd
    var reqCmd = ""
    var reqEnc = ""
    var reqCoEnc = ""
    if(cmd=='1'){
        reqCmd="2"
        reqEnc=encadrant
        reqCoEnc = coEncadrant
    }else if(cmd=='-1'){
        reqCmd="3"
        reqEnc="EncadrantID"
    }else{
        reqCmd="EtatIsncription"
        reqEnc="EncadrantID"
    }
    connection.query("update these set EtatIsncription="+reqCmd+", EncadrantID="+reqEnc+", CoEncadrantId="+reqCoEnc+" where DoctorantID=?",[id],(err,result)=>{
        if(err){
            res.send({
                error:true,
                msg:err
            })
        }else{
            res.send({
                error:false,
                data:result
            });
        }
    })
};


module.exports = DoctPreselected;