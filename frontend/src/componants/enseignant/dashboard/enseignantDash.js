import React, { Component } from 'react';
import BarsEnseignant from "../barsEnseignant"
import "./enseignantDash.css"
import PathingPage from "../../shared/pathingPage"
import CardDashboard from "../../shared/cardDashboard"
import Axios from "axios"
import Cookies from "js-cookie"

class EnseignantDash extends Component {
    state={
        NbrTotalPreinscrit:0,
        NbrTotalEnsign:0,
        NbrTotalActual:0,
        nbrTotalRefused:0,
        EnsgError:false,
        structure:"",
        structId:0
    }
    componentDidMount(){
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
                    structId:resp.data.data.structId,
                    structure:resp.data.data.nom
                })
                Axios.post(process.env.REACT_APP_API_URL+"/auth/getDashInfos",{struct:this.state.structId})
                .then(resp=>{
                    if(resp.data.error===true){
                        
                    }else{
                        this.setState({
                            NbrTotalPreinscrit:resp.data["nbrTotalPre"],
                            NbrTotalEnsign:resp.data["nbrTotalEng"],
                            NbrTotalActual:resp.data["nbrTotalActual"],
                            nbrTotalRefused:resp.data["nbrTotalRefused"],
                        })
                    }
                })
            }
        })
    }
    render() {
        return this.state.EnsgError===true?
            <div className="Error404">
                <p className="title">503</p>
                <p className="text">Vous n'etes pas un member d'une structure de recherche </p>
                <a href="/" onClick={()=>{
                                Cookies.remove("path")
                                Cookies.remove("token")
                                Cookies.remove("USERid")
                                document.location.reload();
                            }}>Déconnecte</a>
            </div>:
        <div>
            <BarsEnseignant ChefEq={this.props.ChefEq}/>
            <div className="MainEnseignantDash">
                <PathingPage title="Dashboard" paths={["Cedoc Emi",this.props.grade,this.state.structure,"Dashboard"]}/>
                <div className="Content">
                    <CardDashboard title={"Total des Doctorants préinscrits dans "+this.state.structure+":"} nbr={this.state.NbrTotalPreinscrit} type="Doctorants" color="warning" />
                    <CardDashboard title={"Total des Enseignants de "+this.state.structure+":"} nbr={this.state.NbrTotalEnsign} type="Enseingnants" color="success" />
                    <CardDashboard title={"Total des Doctorants dans "+this.state.structure+":"}  nbr={this.state.NbrTotalActual} type="Doctorants" color="primary" />
                    <CardDashboard title={"Total des Doctorants refusé par "+this.state.structure+":"} nbr={this.state.nbrTotalRefused} type="Doctorants" color="secondary" />
                </div>
            </div>    
        </div>
    }
}

export default EnseignantDash;