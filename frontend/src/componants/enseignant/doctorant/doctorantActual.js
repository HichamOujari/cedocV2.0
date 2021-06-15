import React, { Component } from 'react';
import BarsEnseignant from "../barsEnseignant"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from "axios"
import Cookies from "js-cookie"
import FolderSharedIcon from '@material-ui/icons/FolderShared';

class EnsgDoctorantAct extends Component {
    contentAction =[
        {
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },
    ]
    state={
        structure:"",
        data : [],
        attribute:[
          {
              nomDATA:"nom",
              nickname:"Nom"
          },{
              nomDATA:"prenom",
              nickname:"Prénom"
          },{
              nomDATA:"email",
              nickname:"Email"
          },{
              nomDATA:"anneeThese",
              nickname:"Année"
          },{
              nomDATA:"Encadrant",
              nickname:"Encadrant"
          },
        ]
    }
    componentDidMount(){
        if(this.props.ChefEq){
            this.contentAction = [...this.contentAction,{
                Components:FolderSharedIcon,
                className:"text-secondary",
                isFolderBtn:true,
                path:"/documents/doctorants/"
            }]
        }
        Axios.get(process.env.REACT_APP_API_URL+"/auth/OldDoct",{
            params:{
                userid:Cookies.get("USERid")
            }
        })
        .then(resp=>{
            this.setState({
                data:resp.data.data
            })
            console.log(resp.data)
        })
        Axios.post(process.env.REACT_APP_API_URL+'/auth/getEnsgAccountInfos',{
            userID:Cookies.get("USERid"),
            type:Cookies.get("path"),
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    EnsgError:true
                })
            }else{
                this.setState({
                    structure:resp.data.data.nom
                })
            }
        })
    }
    render() {
        return (
            <div>
                <BarsEnseignant ChefEq={this.props.ChefEq}/>
                <div className="MainEnsgDocotrantPreinscrit">
                    <PathingPage title="Doctorants actuels" paths={["Cedoc Emi",this.props.grade,this.state.structure,"Doctorants actuels"]}/>
                    <div className="Content">
                        <Table action={true} content={this.contentAction} title="La liste des Doctorants actuels" data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnsgDoctorantAct;