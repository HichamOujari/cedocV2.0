let connection = require("../../config/db");
const exec = require("../exec")

async function Import(res,req){   
    const d = new Date()
    const data = req.body.data;
    var index = 0
    var rslt,ele
    try{
         while(index<data.length){
            ele = data[index]
            rslt = await exec('select id from structure_recherche where CONCAT(structure_recherche.nom," ","(",structure_recherche.acronyme,")")=?',[ele.STRUCTURE_DE_RECHERCHE])
            if(rslt.error===true || rslt.length===0){
                index=data.length
                res.send({
                    error:true,
                    message:{
                            message:{
                                    sqlMessage:"Structure not found : " + ele.STRUCTURE_DE_RECHERCHE
                                }
                            }
                })
            }else{
                const id = rslt[0].id
                rslt = await exec('insert into doctorant values(null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        [
                            ele.NOM,
                            ele.PRENOM,
                            ele.num_dossier,
                            ele.CNE,
                            ele.CNI,
                            ele.DATE_NAISSANCE,
                            ele.EMAIL,
                            ele.TEL,
                            ele.BAC,
                            ele.MENTION_BAC,
                            ele.PROVINCE_BAC,
                            ele.ANNEE_BAC,
                            ele.DIPLOME1,
                            ele.SPECIALITE_DIPLOME1,
                            ele.DATE_OBTENTION_DIPLOME1.length==0?null:parseInt(ele.DATE_OBTENTION_DIPLOME1),
                            ele.ETABLISSEMENT_DIPLOME1,
                            ele.MOYENNE_DIPLOME1.length===0?null:parseFloat(ele.MOYENNE_DIPLOME1),
                            ele.MENTION_DIPLOME1,
                            ele.DIPLOME2,
                            ele.SPECIALITE_DIPLOME2,
                            ele.DATE_OBTENTION_DIPLOME2.length==0?null:parseInt(ele.DATE_OBTENTION_DIPLOME2),
                            ele.ETABLISSEMENT_DIPLOME2,
                            ele.MOYENNE_DIPLOME2.length===0?null:parseFloat(ele.MOYENNE_DIPLOME2),
                            ele.MENTION_DIPLOME2,
                            ele.FONCTION==null?1:2,
                            ele.FONCTION==null?null:ele.FONCTION,
                            id,
                            ele.FORMATION,
                        ])
                if(rslt.error===true){
                        res.send({
                            message:err,
                            error:true
                        })
                }else{
                    const IdDoct = rslt.insertId
                    rslt = await exec('insert into axe values(null,?,?)',[ele.AXE_DE_RECHERCHE,null])
                    if(rslt.error===true || rslt.length===0){
                            res.send({
                                message:err,
                                error:true
                            })
                    }else{
                        const IdAxe = rslt.insertId
                        rslt = await exec('insert into these values(null,null,null,?,0,?,?,null,null)',[d.getFullYear(),IdAxe,IdDoct])
                        if(rslt.error===true || rslt.length===0){
                                res.send({
                                    message:err,
                                    error:true
                                })
                        }else{
                            rslt = await exec("insert into user values(null,?,MD5(?),3,?,null)",[ele.EMAIL,ele.CNI,IdDoct])
                            if(rslt.error===true || rslt.length===0){
                                    res.send({
                                        message:err,
                                        error:true
                                    })
                            }else{
                                if(index===data.length-1) res.send({
                                    error:false,
                                    message:"done"
                                })
                                index++;
                            }
                        }
                    }
                }
            }
        }
    }catch(err){
        console.log(err)
        res.send({
            message:err,
            error:true
        })
    }
};


module.exports = Import;