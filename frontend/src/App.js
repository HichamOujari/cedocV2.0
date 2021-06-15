import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"


/* Componant de page d'accueil */
import Home from "./componants/home/index"

/* Componant de page d'actualité */
import Actualite from "./componants/actualite/index"

/* Componant de page d'authentification */
import Login from "./componants/auth/index"

/* Componant de page importation des fichier d'inscription */
import Inscription from "./componants/doctorant/inscription"

/* Componant de page de profil pour les doctorants */
import Profil from "./componants/doctorant/profil"

/* Componant de page d'accueil pour la partie responsable cedoc */
import AdminDash from "./componants/admin/dashboard/index"

/* Componant de page d'anciens doctorants pour la partie admin */
import AncienDoctorant from "./componants/admin/doctorant/ancienDoctorant"

/* Componant de page des nouveaux doctorants  pour la partie admin*/
import DoctorantPreinscrit from "./componants/admin/doctorant/doctorantPreinscrit"

/* Componant de page */
import Enseignants from "./componants/admin/enseignant/index"
import Structure from "./componants/admin/structures/index"
import ProfilAdmin from "./componants/admin/profil/index"
import Hisfiles from "./componants/admin/doctorant/hisfiles"
import EnseignantDash from "./componants/enseignant/dashboard/enseignantDash"
import EnsgDocotrantPreinscrit from "./componants/enseignant/doctorant/doctorantPreinscrits"
import EnsgDoctorantAct from "./componants/enseignant/doctorant/doctorantActual"
import MesDoctorants from "./componants/enseignant/mes_doct/mesDoctorants"
import EnsgEnseignants from "./componants/enseignant/enseignant/index"
import ProfilEnseig from "./componants/enseignant/profil/index"
import Reinscrire from "./componants/doctorant/re-inscrire"
import HisfilesFromEnsg from "./componants/enseignant/doctorant/document"
import MyDocuments from "./componants/doctorant/myDocuments"
import ProtectedRouter from "./protectedRoute"
import {AuthProvider} from "./authContext"
import Cookies from "js-cookie"

//Cookies.set("hostpath","https://cedoc-back.herokuapp.com")
Cookies.set("hostpath",process.env.REACT_APP_API_URL)


export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            <Route path='/' exact>
              <Home/>
            </Route>
            <Route path='/actualites' exact>
              <Actualite/>
            </Route>
            <Route path='/login' exact>
              <Login/>
            </Route>
            <ProtectedRouter path='/inscription' exact>
              <Inscription/>
            </ProtectedRouter>
            <ProtectedRouter path='/re-inscription' exact>
              <Reinscrire/>
            </ProtectedRouter>
            <ProtectedRouter path='/mes-documents' exact>
              <MyDocuments/>
            </ProtectedRouter>
            <ProtectedRouter path='/profil' exact>
              <Profil/>
            </ProtectedRouter>


            <ProtectedRouter path='/admin' exact>
              <AdminDash/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/doctorant/' exact>
              <AncienDoctorant/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/doctorants/:id' exact>
              <Hisfiles/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/doctorant/preinscrit' exact>
              <DoctorantPreinscrit/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/enseignants' exact>
              <Enseignants/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/structure/equipe' exact>
              <Structure structure="Equipe" id='1' />
            </ProtectedRouter>
            <ProtectedRouter path='/admin/structure/laboratoire' exact>
              <Structure structure="Laboratoire" id='2'/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/structure/centre' exact>
              <Structure structure="Centre" id='3'/>
            </ProtectedRouter>
            <ProtectedRouter path='/admin/profil' exact>
              <ProfilAdmin />
            </ProtectedRouter>


            <ProtectedRouter path='/enseignant' exact>
              <EnseignantDash grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/enseignant/doctorant/preinscrit' exact>
              <EnsgDocotrantPreinscrit grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/enseignant/doctorant/' exact>
              <EnsgDoctorantAct grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/enseignant/enseignants' exact>
              <EnsgEnseignants grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/enseignant/mes-doctorants' exact>
              <MesDoctorants grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/enseignant/profil' exact>
              <ProfilEnseig grade="Enseignant"/>
            </ProtectedRouter>
            <ProtectedRouter path='/documents/doctorants/:id' exact>
              <HisfilesFromEnsg grade={(Cookies.get("path")!==undefined && Cookies.get("path").includes("chef"))?"Chef":"Enseignant"} ChefEq={(Cookies.get("path")!==undefined && Cookies.get("path").includes("chef"))?true:false}/>
            </ProtectedRouter>


            <ProtectedRouter path='/chef' exact>
              <EnseignantDash grade="Chef" ChefEq={true}/>
            </ProtectedRouter>
            <ProtectedRouter path='/chef/doctorant/preinscrit' exact>
              <EnsgDocotrantPreinscrit grade="Chef" ChefEq={true}/>
            </ProtectedRouter>
            <ProtectedRouter path='/chef/doctorant/' exact>
              <EnsgDoctorantAct grade="Chef" ChefEq={true}/>
            </ProtectedRouter>
            <ProtectedRouter path='/chef/enseignants' exact>
              <EnsgEnseignants grade="Chef" ChefEq={true}/>
            </ProtectedRouter>
            <ProtectedRouter path='/chef/profil' exact>
              <ProfilEnseig grade="Chef" ChefEq={true}/>
            </ProtectedRouter>
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}
