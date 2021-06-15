let connection = require("../config/db");
const exec = require("./exec")

var data={};

async function get(path,attr){
    var rslt = await exec(path,[])
    if(rslt.error===true) res.send({error:true,message:rslt})
    else data[attr]=rslt[0][attr]
}

async function getDashInfos (res,req){
    
    var reqdoct=""
    var reqEnsg=""
    if(req.body.struct!=-1){
        reqdoct=" and doctorant.StructureRecherche="+req.body.struct
        reqEnsg=" and enseignant.stucture_recherche="+req.body.struct
    }
    try{
        await get('select count(*) as nbrTotalPre from doctorant,these where doctorant.id=these.DoctorantID and (these.EtatIsncription=0 or these.EtatIsncription=1)'+reqdoct,'nbrTotalPre')
        await get('select count(*) as nbrTotalEng from enseignant where 1=1'+reqEnsg,'nbrTotalEng')
        await get('select count(*) as nbrTotalActual from doctorant,these where doctorant.id=these.DoctorantID and (these.EtatIsncription=2 or these.EtatIsncription=4 or these.EtatIsncription=5)'+reqdoct,'nbrTotalActual')
        await get('select count(*) as nbrTotalRefused from doctorant,these where doctorant.id=these.DoctorantID and (these.EtatIsncription=3)'+reqdoct,'nbrTotalRefused')
        res.send(data)
    }catch(err){
        res.send({
            message:err,
            error:true
        })
    }
};

module.exports = getDashInfos;