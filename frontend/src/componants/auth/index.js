import React, { useContext,useState } from 'react';
import Navbar from "../shared/navbar"
import "./auth.css"
import {Redirect} from "react-router-dom"
import AuthContext from "../../authContext"
import Cookies from "js-cookie"
import Axios from "axios"
import md5 from "md5"

const hostPath = Cookies.get("hostpath")

const Login =()=> {
    const {authToken,setAuthToken} = useContext(AuthContext)
    const [passMode,setPassMode] = useState(0)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [error,setError] = useState(false)
    const attempLogin = async (e)=>{
        e.preventDefault();
        if(email && password){
            Axios.post(hostPath+"/auth/login",{
                email:email,
                password:md5(password)
            })
            .then(response=>{
                console.log(response.data)
                if(response.data.error===true) setError(true)
                else{
                    switch(response.data.type){
                        case 0: Cookies.set("path","/admin");
                                setAuthToken(response.data.token);
                                Cookies.set("token",response.data.token);
                                Cookies.set("USERid",response.data.userID);
                                Cookies.set("username",response.data.user);
                                break
                        case 1: Cookies.set("path","/chef");
                                setAuthToken(response.data.token);
                                Cookies.set("token",response.data.token);
                                Cookies.set("USERid",response.data.userID);
                                Cookies.set("username",response.data.user);
                                document.location.reload();
                                break;
                        case 2: Cookies.set("path","/enseignant");
                                setAuthToken(response.data.token);
                                Cookies.set("token",response.data.token);
                                Cookies.set("USERid",response.data.userID);
                                Cookies.set("username",response.data.user);
                                document.location.reload();
                                break;
                        case 3: Cookies.set("path","/");
                                setAuthToken(response.data.token);
                                Cookies.set("token",response.data.token);
                                Cookies.set("USERid",response.data.userID);
                                Cookies.set("username",response.data.user);
                                document.location.reload();
                                break;
                        default : setError(true);
                                  break 
                    }
                }
            })
            .catch(err=>{
                setError(true)
            })
        }
    }
    const path = Cookies.get("path")
    if(authToken) return <Redirect to={path} />
    return (
        <div>
            <Navbar />
            <div className="MainLogin">
                <div className="content">
                    <p className="title">Sign In</p>
                    <form onSubmit={attempLogin} className="FormLogin">
                        {error===true?<p className="error" >Email ou mot de passe incorrect</p>:null}
                        <input className="EmailInput" required={true} type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Entrer votre email" />
                        <input  className="PassInput" required={true} type={passMode%2===0?"password":"text"} onChange={(e)=>setPassword(e.target.value)} placeholder="Entrer votre mot de passe" />
                        <div className="showPass">
                            <input type="checkbox" onChange={()=>setPassMode(passMode+1)} id="showPassCheck" />
                            <label htmlFor="showPassCheck">Afficher le mot de passe</label>
                        </div>
                        <input type="submit" value="Sign In" className="SignInBtn" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;