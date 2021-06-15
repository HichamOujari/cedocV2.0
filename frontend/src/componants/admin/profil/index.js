import React, { Component } from 'react';
import "./style.css"
import BarsAdmin from "../barsAdmin"
import PathingPage from "../../shared/pathingPage"
import ProfilShared from "../../shared/profilShared"

class ProfilAdmin extends Component {
    data = {
        nom : "Ahmed",
        prenom:"Oudrhiri",
        grade : "Responsable Cedoc",
        email:"admin@emi.ac.ma"
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainProfilAdmin">
                    <PathingPage title="Profil Admin" paths={["Cedoc Emi","Admin","Profil"]}/>
                    <div className="Content">
                        <ProfilShared data={this.data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilAdmin;