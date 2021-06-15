import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./doctorant.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import XLSX from 'xlsx';
import { SheetJSFT } from './excelToJson/types';
import { make_cols } from './excelToJson/MakeColumns';
import Axios from 'axios';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import emailjs from 'emailjs-com';

class DoctorantPreinscrit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaded:"",
            uploadedSucc:false,
            uploadedErr:false,
            uploadedErrMsg:"",
            isNotUploaded:"none",
            notFileUploaded:false,
            file: {},
            cols: [],
            data :[],
            attribute:[
                {
                    nomDATA:"nom",
                    nickname:"Nom"
                },{
                    nomDATA:"prenom",
                    nickname:"Prénom"
                },{
                    nomDATA:"statusDoc",
                    nickname:"Status"
                },{
                    nomDATA:"CNI",
                    nickname:"CNI"
                },{
                    nomDATA:"email",
                    nickname:"Email"
                },{
                    nomDATA:"STRUCTURE_DE_RECHERCHE",
                    nickname:"Structure de recherche"
                },{
                    nomDATA:"Etat_inscription",
                    nickname:"Etat d'inscription"
                },
            ]
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    handleChange(e) {
        this.setState({notFileUploaded:false})
        const files = e.target.files;
        if (files && files[0]) this.setState({file: files[0]});
    }
    contentAction =[
        {
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },{
            Components:FolderSharedIcon,
            className:"text-secondary",
            isFolderBtn:true,
            path:"/admin/doctorants/"
        },
    ]
    handleFile() {
        if(!document.getElementById("IdUploadExcel").files[0]) {
            this.setState({notFileUploaded:true})
        }else{
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = (e) => {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr,{type: rABS ? 'binary' : 'array', bookVBA : true });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                var data = XLSX.utils.sheet_to_json(ws,{defval:""});
                data = data.map((ele,index)=>data[index] = {...data[index],Etat_inscription:"Pre-inscrire"})
                this.setState({ data: data, cols: make_cols(ws['!ref']) });
                Axios.post(process.env.REACT_APP_API_URL+"/auth/importExcel",{
                    data:data
                }).then(response=>{
                    if(response.data.error===false) {
                        this.setState({uploadedSucc:true,notFileUploaded:false})
                        data.map(ele=>{
                            console.log(ele.CNI+" "+ele.NOM+"-"+ele.PRENOM+"  "+ele.EMAIL)
                            emailjs.send("service_qf2dzer","template_rx8o3in",{
                                sujet: "Information d Authentification",
                                to_name: ele.NOM+" "+ele.PRENOM ,
                                email_auth: ele.EMAIL,
                                pass_auth: ele.CNI,
                                to_email: ele.EMAIL,
                            },"user_WyEJxiUFl6WZq6e5wEgdS");
                        })
                    }
                    else{
                        this.setState({
                            uploadedErr:true,
                            uploadedErrMsg:response.data.message.message.sqlMessage
                        })
                    }
                })
            };
            if (rABS) {
                reader.readAsBinaryString(this.state.file);
            } else {
                reader.readAsArrayBuffer(this.state.file);
            };
        }
    }
    
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+"/auth/doctPreselected")
        .then(response=>{
            if(response.data.data.length!==0) this.setState({
                isUploaded:"none",
                isNotUploaded:""
            })
            this.setState({
                data:response.data.data
            })
        })
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainDoctorantPreinscrit">
                    <PathingPage title="Doctorants préinscrits" paths={["Cedoc Emi","Admin","Doctorants préinscrits"]}/>
                    <div className="Content">
                        <div className={"SectionuploadExcel "+this.state.isUploaded}>
                            {this.state.uploadedSucc===true?<p className="UploadedSucc">le fichier excel est bien importé</p>:null}
                            {this.state.notFileUploaded===true?<p className="NotUploaded">Il faut importer un fichier</p>:null}
                            {this.state.uploadedErr===true?<p className="NotUploaded">{this.state.uploadedErrMsg}</p>:null}
                            <p className="title">Importation du fichier Excel</p>
                            <input type="file" accept={SheetJSFT} onChange={this.handleChange} id="IdUploadExcel" hidden />
                            <div onClick={()=>{
                                document.getElementById("IdUploadExcel").click()
                                this.setState({uploadedSucc:false})
                            }} className="Upload">
                                <BackupRoundedIcon  className="icon" />
                                <p className="text">Cliquer ici pour importer le fichier Excel</p>
                            </div>
                            <button onClick={this.handleFile} className="BtnSubmit">Valider</button>
                        </div>
                        <Table className={this.state.isNotUploaded} action={true} content={this.contentAction} title="Affichage des doctorants préinscrits" data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default DoctorantPreinscrit;