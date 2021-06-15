let connection = require("../../config/db");

const UpdateStructureById = (res,req)=>
{
    const nom=req.body.nom
    const acronyme=req.body.acronyme
    const chef=req.body.chef
    const date=req.body.date
    const theme=req.body.theme
    const idStruct = req.body.idStruct
    var query = "update structure_recherche set nom=? , acronyme=? ," 
    if(chef!="null"){
        connection.query("UPDATE USER SET user.type=2 where user.idUser in (select id from enseignant where enseignant.stucture_recherche="+idStruct+")",(err,result)=>{})
        connection.query("update user set user.type=1 where user.idUser="+chef+" and user.type=2",(err,result)=>{})
    }
    query+=" dateCreation=? , theme=? where structure_recherche.id=?"
    console.log(query)
    connection.query(query,[nom,acronyme,date,theme,idStruct],(err,result)=>{
        if(err){
            res.send({
                error:true,
                message:err
            })
        }else{
            res.send({
                error : false,
                data:"done!",
            });
        }
    })
};

module.exports = UpdateStructureById;