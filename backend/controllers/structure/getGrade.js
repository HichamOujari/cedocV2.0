let connection = require("../../config/db");

const GetGrade = (res,req)=>{
    connection.query('select id,name as nom from grade',(err,result)=>{
        if(err){
            res.send({
                error:true,
                message:err
            })
        }else{
            res.send({
                error : false,
                data:result,
            });
        }
    })
};

module.exports = GetGrade;