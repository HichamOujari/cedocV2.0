let connection = require("../../config/db");

const GetUser = (res,req)=>
{
    const email = req.body.email;
    const pass = req.body.password;
    connection.query("SELECT * FROM user WHERE email = ? and password = ?",[email,pass],(err,result)=>{
        if(err){
            res.send({
                error:true,
                errorSystem:true
            })
        }else if(result.length==1){
            const d = new Date()
            const token = d.getTime()
            const id = result[0].id
            connection.query("update user set token=? WHERE id = ? ",[token,id])
            res.send({
                error:false,
                token:token,
                user:result[0].email.split('@')[0],
                type:result[0].type,
                userID:id,
            });
        }else{
            res.send({
                error : true,
                errorSystem:false,
            });
        }
    })
};


module.exports = GetUser;