import React, { Component } from 'react';
import BarsEnseignant from "../barsEnseignant"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import axios from 'axios';
import DoctDocument from "../../shared/doct_document"
import Cookies from "js-cookie"

class HisfilesFromEnsg extends Component {
    state={
        doctNom:"",
    }
    componentDidMount(){
        axios.post(process.env.REACT_APP_API_URL+'/auth/getDoctFiles',{
            DoctID:document.location.href.split("doctorants/")[1],
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    doctNom:"inconnu"
                })
            }else{
                this.setState({
                    doctNom:resp.data.nom.nom
                })
            }
        })
        axios.post(process.env.REACT_APP_API_URL+'/auth/getEnsgAccountInfos',{
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
                <div className="MainAncienDoctorant">
                    <PathingPage title={"les fichiers de "+this.state.doctNom} paths={["Cedoc Emi",this.props.grade,this.state.structure,"Les ancien doctorants","Les fichiers personnels"]}/>
                    <DoctDocument idDoc={document.location.href.split("doctorants/")[1]} />
                </div>
            </div>
        );
    }
}

export default HisfilesFromEnsg;