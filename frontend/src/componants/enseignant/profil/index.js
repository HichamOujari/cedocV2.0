import React, { Component } from 'react';
import "./style.css"
import BarsEnseignant from "../barsEnseignant"
import PathingPage from "../../shared/pathingPage"
import ProfilShared from "../../shared/profilShared"
import Cookies from "js-cookie"
import Axios from "axios"

class ProfilEnseig extends Component {
    data = {
        nom : this.props.ChefEq===true?"El-Fadoulli":"Kamal",
        prenom:this.props.ChefEq===true?"Nouredine":"Ouaaqa",
        grade : "Enseignant de l'équipe RIME",
        email:this.props.ChefEq===true?"nfadoulli@emi.ac.ma":"KamalOuaaqa@emi.ac.ma"
    }
    state = {
        structure:"",
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
                    structure:resp.data.data.nom
                })
            }
        })
    }
    render() {
        return (
            <div>
                <BarsEnseignant ChefEq={this.props.ChefEq}/>
                <div className="MainProfilEnseig">
                    <PathingPage title="Profil Admin" paths={["Cedoc Emi",this.props.grade,this.state.structure,"Profil"]}/>
                    <div className="Content">
                        <ProfilShared data={this.data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilEnseig;