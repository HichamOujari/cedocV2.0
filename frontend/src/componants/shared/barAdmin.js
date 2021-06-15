import React, { Component } from 'react';
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import "./style.css"
import Cookies from "js-cookie"

class BarAdmin extends Component {
    render() {
        return (
            <div className="BarAdmin">
                <div className="sideBar">
                    <Link to="/" className="logo">
                        <img className="icon" src={logo} alt="logo" />
                        <p className="title">Cedoc EMI</p>
                    </Link>
                    <ul className="ElesSideBar">
                        {
                            this.props.Eles.map((ele,index)=>{
                                return(<li key={index}>
                                    <Link to={ele.path}>
                                        {ele.icon}
                                        <p className="title">{ele.title}</p>
                                    </Link>
                                    {ele.ele.length===0?null:
                                    <ul className="sousElementSidebarAdmin">
                                        {
                                            ele.ele.map((sousEle,sousIndex)=>{
                                                return (<li key={sousIndex}>
                                                    <Link to={sousEle.path}>{sousEle.title}</Link>
                                                </li>)
                                            })
                                        }
                                    </ul>}
                                </li>)
                            })
                        }
                    </ul>
                    <div className="background"></div>
                </div>
                <div className="navBar">
                    <div className="BarRecherche">
                        <input type="text" placeholder="Recherche ..." />
                        <SearchRoundedIcon className="icon" />
                    </div>
                    <div className="profil">
                        <PersonRoundedIcon className="icon" />
                        <ul className="AdminProfilDropdown">
                            <li><Link to={this.props.profilPath}>Profil</Link></li>
                            <li onClick={()=>{
                                Cookies.remove("path")
                                Cookies.remove("token")
                                Cookies.remove("USERid")
                                document.location.reload();
                            }}>Déconnecte</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default BarAdmin;