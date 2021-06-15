import React, { Component } from 'react';
import "./doctorant.css"
import NavBar from "../shared/navbar"
import Title from "../shared/title"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Profil extends Component {
    state={
        passMod:0
    }
    render() {
        return (
            <div>
                <NavBar />
                <div className="MainProfilDoct">
                    <Title title="Profil" />
                    <form className="FormProfil">
                        <div className="top">
                            <AccountCircleIcon className="icon"/>
                            <p className="title">John Doe</p>
                        </div>
                        <div className="Inputs">
                            <div className="first">
                                <div className="NomInput">
                                    <p className="title">Nom</p>
                                    <input type="text" disabled={true} placeholder="DocNom"/>
                                </div>
                                <div className="PrenomInput">
                                    <p className="title">Prénom</p>
                                    <input type="text" disabled={true} placeholder="DocPrénom"/>
                                </div>
                            </div>
                            <div className="second">
                                <div className="DDInput">
                                    <p className="title">Date de Naissance</p>
                                    <input type="text" disabled={true} placeholder="01/01/1999"/>
                                </div>
                                <div className="CNIInput">
                                    <p className="title">CNI</p>
                                    <input type="text" disabled={true} placeholder="FB18274"/>
                                </div>
                            </div>
                            <div className="third">
                                <div className="EmailInput">
                                    <p className="title">Email</p>
                                    <input type="email" placeholder="doc@gmail.com"  />
                                </div>
                                <div className="TeleInput">
                                    <p className="title">Numero de Telephone</p>
                                    <input type="tele" />
                                </div>
                            </div>
                            <div className="fourth">
                                <div className="OldPassInput">
                                    <p className="title">Ancien mot de passe</p>
                                    <input required={true} type={this.state.passMod%2===0?"password":"text"}  />
                                </div>
                                <div className="NewPassInput">
                                    <p className="title">Nouveau mot de passe</p>
                                    <input type={this.state.passMod%2===0?"password":"text"} />
                                </div>
                            </div>
                            <div className="ConfirmPassInput">
                                <p className="title">Confirmer le mot de passe</p>
                                <input type={this.state.passMod%2===0?"password":"text"}/>
                            </div>
                        </div>
                        <div className="ShowPass">
                            <input type="checkbox" onChange={()=>this.setState({
                                passMod:this.state.passMod+1
                            })} id="IdShowPassProfilDoct"/>
                            <label className="title" htmlFor="IdShowPassProfilDoct">Afficher le mot de passe</label>
                        </div>
                        <input type="submit" className="submitBtn" value="Modifer" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Profil;