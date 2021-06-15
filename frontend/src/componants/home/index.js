import React, { useContext } from 'react';
import "./home.css"
import {Redirect} from "react-router-dom"
import Navbar from "../shared/navbar"
import Cookies from "js-cookie"
import AuthContext from "../../authContext"

export default function Home (){
  const {authToken} = useContext(AuthContext)
  const path = Cookies.get("path")?Cookies.get("path"):"/"
  if(authToken && path!=="/") return <Redirect to={path} />
  else return (
    <div>
        <Navbar />
        <div className="MainHome">
            <div className="Content">
                <h3 className="title">Welcome to Cedoc EMI</h3>
                <p className="sousTitle">Cycle Doctoral</p>
                <p className="lieu">Rabat</p>
            </div>
        </div>
    </div>
  );
}
