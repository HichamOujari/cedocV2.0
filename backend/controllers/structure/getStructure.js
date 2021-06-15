let connection = require("../../config/db");

const GetStructure = (res,req)=>
{
    connection.query('select structure_recherche.id,concat(typestructure.type," ",structure_recherche.acronyme) as nom from structure_recherche,typestructure where structure_recherche.typeStructure=typestructure.id',(err,result)=>{
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

module.exports = GetStructure;