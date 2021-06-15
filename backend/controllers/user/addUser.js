let connection = require("../../config/db");

const AddUser = (res,req)=>{   
    const email = req.body.email;
    const pass = req.body.password;
    connection.query("insert into user values(null,?,?,null)",[email,pass],(err,result)=>{
        if(err){
            res.send({
                error:true,
            })
        }else{
            res.send({
                id:result.insertId,
                error:false
            });
        }
    })
};


module.exports = AddUser;