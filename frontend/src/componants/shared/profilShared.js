import React, { Component } from 'react';
import './style.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Input = ({title,type,placeholder,IsRequired})=>{
    return (<div className="TextInput">
        <p className="title">{title}</p>
        <input type={type} required={IsRequired} placeholder={placeholder}/>
    </div>)
}

class ProfilShared extends Component {
    state={
        passMod:0
    }
    render() {
        return (
            <form className="ProfilSharedComp">
                <div className="left">
                    <AccountCircleIcon className="icon"/>
                    <p className="name">Mr. {this.props.data.nom+" "+this.props.data.prenom}</p>
                    <p className="grade">{this.props.data.grade}</p>
                </div>
                <div className="right">
                    <Input title="email" type="email" placeholder={this.props.data.email}  />
                    <Input title="Ancien mot de passe" IsRequired={true} type={this.state.passMod%2===0?"password":"text"} placeholder=""  />
                    <Input title="Nouveau mot de passe" type={this.state.passMod%2===0?"password":"text"} placeholder=""  />
                    <Input title="Confirmer le nouveau mot de passe" type={this.state.passMod%2===0?"password":"text"} placeholder=""  />
                    <div className="CheckBoxInput">
                        <input id="idcheckboxprofiladmin" onChange={()=>this.setState({
                        passMod:this.state.passMod+1
                    })} type="checkbox" />
                        <label htmlFor="idcheckboxprofiladmin">Afficher le mot de passe</label>
                    </div>
                    <input type="submit" value="Valider" className="btnSubmit" />
                </div>
            </form>
        );
    }
}

export default ProfilShared;