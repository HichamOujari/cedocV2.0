import React,{createContext,useState,useEffect} from "react"
import Cookies from "js-cookie"
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authToken,setAuthToken] = useState(null)
    useEffect(()=>{
        const token = Cookies.get("token")
        if(token) setAuthToken(token)
    },[])
    return <AuthContext.Provider value={{authToken,setAuthToken}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;