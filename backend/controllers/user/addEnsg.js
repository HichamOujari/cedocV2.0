let connection = require("../../config/db");
const exec = require("../exec")

async function AddEnsg (res,req){
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const tele = req.body.tele;
    const specialite = req.body.specialite;
    const grade = req.body.grade;
    const structure = req.body.structure;

    try{
        var rslt = await exec('insert into enseignant values(null,?,?,?,?,?,?,?)',[nom,prenom,email,tele,specialite,grade,structure=='-1'?null:structure])
        if(rslt.error===true){
            res.send({
                error:true,
                message:rslt
            })
        }else{
            rslt = await exec('insert into user values(null,?,MD5(CONCAT(?,?)),2,?,null)',[email,prenom,nom,rslt.insertId])
            if(rslt.error===true){
                res.send({
                    error:true,
                    message:rslt
                })
            }else{
                res.send({
                    error:false,
                    message:"succ"
                })
            }
        }
    }catch(err){
        res.send({
            message:err,
            error:true
        })
    }
};

module.exports = AddEnsg;