let connection = require("../../config/db");
const exec = require("../exec")

var data={};

async function get(path,attr){
    var rslt = await exec(path,[])
    if(rslt.error===true) res.send({error:true,message:rslt})
    else data[attr]=rslt
}

async function GetMembers (res,req){
    try{
        await get("select concat(doctorant.nom,' ',doctorant.prenom) as nom,doctorant.id from doctorant where doctorant.StructureRecherche="+req.body.ID,'Doctorants')
        await get("select enseignant.id,concat(enseignant.nom,' ',enseignant.prenom) as nom from enseignant,structure_recherche where enseignant.stucture_recherche=structure_recherche.id and structure_recherche.id="+req.body.ID,'Enseignants')
        await get('SELECT structure_recherche.acronyme as nom,structure_recherche.id from structure_recherche where structure_recherche.typeStructure=1 and structure_recherche.structure_assoc='+req.body.ID,'Equipe')
        await get('SELECT structure_recherche.acronyme as nom,structure_recherche.id from structure_recherche where structure_recherche.typeStructure=2 and structure_recherche.structure_assoc='+req.body.ID,'Laboratoire')
        res.send({
            error:false,
            data:data
        })
    }catch(err){
        res.send({
            message:err,
            error:true
        })
    }
};

module.exports = GetMembers;