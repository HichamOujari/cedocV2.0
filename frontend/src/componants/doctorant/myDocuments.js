import React, { Component } from 'react';
import "./doctorant.css"
import NavBar from "../shared/navbar"
import Title from "../shared/title"
import Axios from "axios"
import Cookies from "js-cookie"
import Table from "../shared/table"
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';

class MyDocuments extends Component {
    contentAction =[
        {
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleFileBtn:true
        },{
            Components:DeleteSweepRoundedIcon,
            className:"text-danger",
            isDeleteFileBtn:true,
        },
    ]
    state = {
        doctNom:"",
        data:[],
        attribute:[
            {
                nomDATA:"name",
                nickname:"Le nom de document"
            }
          ],
          succMsg:"",
          errMsg:""
    }
    delete = (id)=>{
        Axios.post(process.env.REACT_APP_API_URL+"/auth/DeleteFile",{
            idDoc:id
        })
        .then(resp=>{
            if(resp.data.error===false){
                this.setState({
                    succMsg: "Le document est supprimé avec success" 
                })
            }else{
                this.setState({
                    errMsg:"Echec de supprimer le document"
                })
            }
        })
    }
    loadingPage = ()=>{
        Axios.post(process.env.REACT_APP_API_URL+'/auth/getDoctFiles',{
            userID:Cookies.get("USERid"),
        })
        .then(resp=>{
            console.log(resp.data)
            if(resp.data.error===true){
                this.setState({
                    doctNom:"inconnu"
                })
            }else{
                this.setState({
                    doctNom:resp.data.nom,
                    data:resp.data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadingPage()
    }
    render() {
        return (
            <div>
                <NavBar />
                <div className="MainInscription">
                    <Title title="Mes Documents :" />
                    
                    <p className="errorMessage">{this.state.errMsg}</p>
                    <p className="succMessage">{this.state.succMsg}</p>
                    <div className="TableMyFile">
                        <Table action={true} content={this.contentAction} title="Liste des documents importés" data={this.state.data} attribute={this.state.attribute} />
                        <input hidden id="IdFileDelete" onClick={(e)=>{
                            this.delete(e.target.value)
                            this.loadingPage()
                        }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MyDocuments;