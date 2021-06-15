let connection = require("../config/db");

const exec = (query,param,callbac)=>{
    return new Promise((resolve,reject)=>{
        connection.query(query,param,(err,result)=>{
            if(err) return reject({
                error:true,
                message:err
            })
            return resolve(result)
        })
    })
}

module.exports = exec;