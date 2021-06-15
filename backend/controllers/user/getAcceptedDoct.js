let connection = require("../../config/db");
var fs = require('fs');

const GetAcceptedDoct = (res,req)=>
{
    connection.query("select doctorant.nom,doctorant.prenom,doctorant.CNE as cne,structure_recherche.acronyme as equipe from doctorant,these,structure_recherche where structure_recherche.id=doctorant.StructureRecherche and these.DoctorantID=doctorant.id and these.EtatIsncription=2 and these.annee=YEAR(NOW())",(err,result)=>{
        if(err){
            res.send({
                error:true,
                errorSystem:true
            })
        }else{
            res.send({
                error:false,
                data:result
            });
        }
    })
};


module.exports = GetAcceptedDoct;