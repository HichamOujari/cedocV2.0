import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./adminDash.css"
import PathingPage from "../../shared/pathingPage"
import CardDashboard from "../../shared/cardDashboard"
import Axios from "axios";
import Cookies from "js-cookie"

const hostPath = Cookies.get("hostpath")

class AdminDash extends Component {
    state={
        NbrTotalPreinscrit:0,
        NbrTotalEnsign:0,
        NbrTotalActual:0,
        nbrTotalRefused:0,
    }
    componentDidMount(){
        Axios.post(hostPath+"/auth/getDashInfos",{struct:-1})
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
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainAdminDash">
                    <PathingPage title="Dashboard" paths={["Cedoc Emi","Admin","Dashboard"]}/>
                    <div className="Content">
                        <CardDashboard title="Total des Doctorants préinscrits :" nbr={this.state.NbrTotalPreinscrit} type="Doctorants" color="warning" />
                        <CardDashboard title="Total des Enseignants :" nbr={this.state.NbrTotalEnsign} type="Enseingnants" color="success" />
                        <CardDashboard title="Total des Doctorants actuelle :" nbr={this.state.NbrTotalActual} type="Doctorants" color="primary" />
                        <CardDashboard title="Total des Doctorants refusé :" nbr={this.state.nbrTotalRefused} type="Doctorants" color="secondary" />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDash;