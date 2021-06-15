let connection = require("../../config/db");
var fs = require('fs');

const getDoctFiles = (res,req)=>
{
    var userID;
    if(req.body.userID==null){
        userID = " user.idUser="+req.body.DoctID;
    }else{
        userID = " user.id="+req.body.userID;
    }
    connection.query("select concat(nom,' ',prenom) as nom from doctorant,user where user.idUser=doctorant.id and "+userID,(err,result)=>{
        if(err){
            res.send({
                error:true,
                errorSystem:true
            })
        }else if(result.length==1){
            const nom = result[0];
             connection.query("select document.id,name,data from document,user,these where user.idUser=these.DoctorantID and document.idThese=these.id and "+userID,(err,rslt)=>{
                if(err){
                    res.send({
                        error:true,
                        msg:err
                    })
                }else{
                    res.send({
                        nom:nom,
                        data:rslt
                    });
                }
            })
        }else{
            res.send({
                error : true,
                errorSystem:false,
                msg:err
            });
        }
    })
};


module.exports = getDoctFiles;