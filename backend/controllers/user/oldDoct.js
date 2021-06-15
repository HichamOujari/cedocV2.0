let connection = require("../../config/db");

const OldDoct = (res,req)=>{   
    const userid = req.query.userid
    var mydoct = ""
    
    var isSpecifiedAccount = "";
    if(userid!=undefined){
        isSpecifiedAccount=" and structure_recherche.id in (select enseignant.stucture_recherche from user,enseignant where user.idUser=enseignant.id and user.id="+userid+")"
        if(req.query.isMyDoct!=undefined){
            mydoct="and ((these.EncadrantID in (SELECT user.idUser FROM `user` WHERE user.id="+userid+") ) or these.CoEncadrantId in (SELECT user.idUser FROM `user` WHERE user.id="+userid+") )"
        }
    }
    connection.query('select doctorant.id,doctorant.nom,doctorant.prenom,doctorant.NumDoss,statutdoctorant.type as statusDoc,doctorant.CNE,doctorant.CNI,doctorant.DateNaissance,doctorant.mail as email,doctorant.Tele,doctorant.Bac,doctorant.mention as mentioen_bac,doctorant.province as province_bac,doctorant.AnnecBac,doctorant.diplome1,doctorant.SpecialiteDiplome1,doctorant.DateObtentionDip1,doctorant.EtablissementDip1,doctorant.MoyenneDip1,doctorant.MentionDip1,doctorant.diplome2,doctorant.SpecialiteDiplome2,doctorant.DateObtentionDip2,doctorant.EtablissementDip2,doctorant.MoyenneDip2,doctorant.MentionDip2,etat_inscription.type as Etat_inscription,these.annee as anneeThese,CONCAT(enseignant.nom," ",enseignant.prenom) as Encadrant,structure_recherche.nom as STRUCTURE_DE_RECHERCHE,doctorant.formation from statutdoctorant,doctorant,structure_recherche,these,etat_inscription,enseignant where etat_inscription.id=these.EtatIsncription and doctorant.id=these.DoctorantID and enseignant.id=these.EncadrantID and structure_recherche.id=doctorant.StructureRecherche and statutdoctorant.id=doctorant.Statut '+mydoct+'and (these.EtatIsncription=2 or these.EtatIsncription=4 or these.EtatIsncription=5)'+isSpecifiedAccount,(err,result)=>{
        if(err){
            res.send({
                error:true,
            })
        }else{
            res.send({
                error:false,
                data:result
            });
        }
    })
};

module.exports = OldDoct;