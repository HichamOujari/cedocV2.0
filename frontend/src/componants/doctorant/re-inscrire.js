import React, { Component } from 'react';
import "./doctorant.css"
import NavBar from "../shared/navbar"
import Title from "../shared/title"

class Reinscrire extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="MainInscription">
                    <Title title="Re-Inscription Doctorant" />
                </div>
            </div>
        );
    }
}

export default Reinscrire;