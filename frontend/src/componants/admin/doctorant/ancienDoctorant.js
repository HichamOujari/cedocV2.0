import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./doctorant.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from "axios"
import FolderSharedIcon from '@material-ui/icons/FolderShared';

class AncienDoctorant extends Component {
    contentAction =[
        {
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true,
        },{
            Components:FolderSharedIcon,
            className:"text-secondary",
            isFolderBtn:true,
            path:"/admin/doctorants/"
        },
    ]
    state={
        data : [],
        attribute:[
          {
              nomDATA:"nom",
              nickname:"Nom"
          },{
              nomDATA:"prenom",
              nickname:"Prénom"
          },{
              nomDATA:"CNE",
              nickname:"CNE"
          },{
              nomDATA:"email",
              nickname:"Email"
          },{
              nomDATA:"Encadrant",
              nickname:"Encadrant"
          },{
              nomDATA:"STRUCTURE_DE_RECHERCHE",
              nickname:"Equipe"
          },{
            nomDATA:"anneeThese",
            nickname:"Année"
          },{
            nomDATA:"Etat_inscription",
            nickname:"Etat d'inscription"
          },
        ]
    }
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+"/auth/OldDoct")
        .then(resp=>{
            this.setState({
                data:resp.data.data
            })
            console.log(resp.data)
        })
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainAncienDoctorant">
                    <PathingPage title="Ancien doctorants" paths={["Cedoc Emi","Admin","Les ancien doctorants"]}/>
                    <div className="Content">
                    <Table action={true} content={this.contentAction} title="Affichage des anciens doctorants" data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AncienDoctorant;