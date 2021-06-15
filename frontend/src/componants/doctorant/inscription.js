import React, { Component } from 'react';
import "./doctorant.css"
import NavBar from "../shared/navbar"
import Title from "../shared/title"
import BackupIcon from '@material-ui/icons/Backup';
import CloseIcon from '@material-ui/icons/Close';
import Axios from "axios"
import Cookies from "js-cookie"

class Inscription extends Component {
    state={
        files:[],
        data:{numDoss:"",CNE:""},
        errMsg:"",
        succMesg:""
    }
    submitFiles = (e) =>{
        e.preventDefault()
        this.setState({
            errMsg:""
        })
        if(this.state.files.length===0){
            this.setState({
                errMsg:"Il faut selectioner des fichier"
            })
        }else{
            const formData = new FormData();
            this.state.files.map(ele=>formData.append(ele.name,ele.data))
            formData.append("idUser",Cookies.get("USERid"))
            Axios.post(process.env.REACT_APP_API_URL+"/auth/uploadFileInscription",formData,{
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            })
            .then(resp=>{
                if(resp.data.error===false){
                    this.setState({
                        succMesg:"Bien enregistré",
                        files:[]
                    })
                    setTimeout(()=>document.location.reload(),2000)
                }else{
                    this.setState({
                        errMsg:"Un probleme y arrivé, merci de réessayer ultérieurement"
                    })
                }
            })
        }
    }
    componentDidMount(){
        Axios.post(process.env.REACT_APP_API_URL+'/auth/getDoctInfos',{
            userID:Cookies.get("USERid")
        })
        .then(resp=>{
            this.setState({
                data:resp.data
            })
        })
    }
    render() {
        return (
            <div>
                <NavBar />
                <div className="MainInscription">
                    <Title title="Inscription Doctorant" />
                    <form onSubmit={this.submitFiles} className="FormInscription">
                        
                    <p className="errorMessage">{this.state.errMsg}</p>
                    <p className="succMessage">{this.state.succMesg}</p>
                        <div className="first">
                            <div className="NumDossier">
                                <p className="title">Numero de dossier</p>
                                <input className="NumDossierInput" type="text" disabled={true} value={this.state.data.numDoss} />
                            </div>
                            <div className="CNE">
                                <p className="title">CNE</p>
                                <input className="CNEInput" type="text" disabled={true} value={this.state.data.CNE} />
                            </div>
                        </div>
                        <div className="Recu">
                            <p className="title">Reçus de paiment</p>
                            <input onChange={async ()=>{
                                var files = document.getElementById("IdInputToUpload").files
                                var tmp=[]
                                for(var i=0;i<files.length;i++){
                                    tmp=[...tmp,{
                                                    id:this.state.files[this.state.files.length-1]===undefined?0:this.state.files[this.state.files.length-1].id+1,
                                                    name:files[i].name,
                                                    size:files[i].size,
                                                    data:files[i] //await toBase64(files[i])
                                                }
                                        ]
                                }
                                this.setState({
                                        files:[...this.state.files,...tmp]
                                    })
                            }} id="IdInputToUpload" type="file" accept="application/pdf" multiple={true} hidden={true} />
                            <div onClick={()=>document.getElementById("IdInputToUpload").click()} className="Upload">
                                <BackupIcon className="icon"/>
                                <p className="text">Importer vos fichiers</p>
                            </div>
                            <div className="uploaded">
                                {
                                    this.state.files.map((ele,index)=>{
                                        return (<div className="file" key={index}>
                                            <p className="name">{ele.name}</p>
                                            <div>
                                                <p className="size">{ele.size}Ko</p>
                                                <p className="progress">Done</p>
                                                <CloseIcon onClick={()=>{
                                                    var tmp=[]
                                                    this.state.files.map((sousEle)=>{
                                                        if(sousEle.id!==ele.id) tmp=[...tmp,sousEle]
                                                        return null
                                                    })
                                                    this.setState({
                                                        files:tmp
                                                    })
                                                }} className="icon"/>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                        <input type="submit" value="Valider" className="btnSubmit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Inscription;