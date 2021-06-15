import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./doctorant.css"
import PathingPage from "../../shared/pathingPage"
import axios from 'axios';
import DoctDocument from "../../shared/doct_document"

class Hisfiles extends Component {
    state={
        doctNom:"",
    }
    componentDidMount(){
        axios.post(process.env.REACT_APP_API_URL+'/auth/getDoctFiles',{
            DoctID:document.location.href.split("doctorants/")[1],
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    doctNom:"inconnu"
                })
            }else{
                this.setState({
                    doctNom:resp.data.nom.nom
                })
            }
        })
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainAncienDoctorant">
                    <PathingPage title={"les fichiers de "+this.state.doctNom} paths={["Cedoc Emi","Admin","Les ancien doctorants","Les fichiers personnels"]}/>
                    <DoctDocument idDoc={document.location.href.split("doctorants/")[1]} />
                </div>
            </div>
        );
    }
}

export default Hisfiles;