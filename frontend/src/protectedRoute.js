import {Route,Redirect} from "react-router-dom"
import React,{useContext} from "react"
import AuthContext from "./authContext"

const ProtectedRouter  = ({children,path})=>{

    const {authToken} = useContext(AuthContext);

    if(!authToken) return (<Redirect to="/login" />)
    return (<Route path={path}>
        {children}
    </Route>)
}

export default ProtectedRouter;