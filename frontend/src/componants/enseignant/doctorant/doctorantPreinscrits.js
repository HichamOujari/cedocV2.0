import React, { Component } from 'react';
import BarsEnseignant from "../barsEnseignant"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from "axios"
import Cookies from "js-cookie"
import CancelIcon from '@material-ui/icons/Cancel';

const Accept = ({className,id,chef})=>{
    return chef===true?
     (<p onClick={()=>{
        document.getElementById("showChooseEncForm").click()
        document.getElementById("idDoctAccpt").value=id
    }} className={className}>Accepter</p>) :
    (<p  className={className}>Accepter</p>)
    
}
const Refuse = ({className,id,chef})=>{
    return chef===true?
    (<p onClick={()=>{
        Axios.post(process.env.REACT_APP_API_URL+"/auth/selectPretDoct",{
            id:id,
            cmd:-1,
        })
        .then(resp=>{
            if(resp.data.error===true){

            }else document.getElementById("IdUpdatePreselectDoct").click()
        })
    }} className={className}>Réfuser</p>):
    (<p className={className}>Réfuser</p>)
}
class EnsgDocotrantPreinscrit extends Component {
    contentAction =[
        {
            Components:Accept,
            className:this.props.ChefEq===true?"text-success":"text-secondary",
            isAcceptBtn:true,
            chef:this.props.ChefEq,
        },{
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },{
            Components:Refuse,
            className:this.props.ChefEq===true?"text-danger":"text-secondary",
            isRefuseBtn:true,
            chef:this.props.ChefEq
        },
    ]
    state={
        structure:"",
        stateAccepForm:"none",
        ensgToEncad:[],
        data : [],
        attribute:[
          {
              nomDATA:"nom",
              nickname:"Nom"
          },{
              nomDATA:"prenom",
              nickname:"Prénom"
          },{
              nomDATA:"email",
              nickname:"Email"
          },{
              nomDATA:"diplome1",
              nickname:"Diplome"
          },{
              nomDATA:"MoyenneDip1",
              nickname:"Moyenne"
          },
        ],
        mesgError:""
    }
    componentDidMount(){
        document.getElementById("IdUpdatePreselectDoct").click()
        Axios.post('http://localhost:3001/auth/getEnsgAccountInfos',{
            userID:Cookies.get("USERid"),
            type:Cookies.get("path"),
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    EnsgError:true
                })
            }else{
                this.setState({
                    structure:resp.data.data.nom
                })
            }
        })
        Axios.post(process.env.REACT_APP_API_URL+"/auth/getEnsgSameStruct",{
            userid:Cookies.get("USERid")
        }).then(resp=>{
            if(resp.data.error===true){
            }else{
                this.setState({
                    ensgToEncad:resp.data.data
                })
            }
        })
    }
    render() {
        return (
            <div>
                <BarsEnseignant ChefEq={this.props.ChefEq}/>
                <div className="MainEnsgDocotrantPreinscrit">
                    <PathingPage title="Doctorants préinscrits" paths={["Cedoc Emi",this.props.grade,this.state.structure,"Doctorants préinscrits"]}/>
                    <div className="Content">
                        <Table content={this.contentAction} action={true} title="La liste des Doctorants préinscrits" data={this.state.data} ChefEq={this.props.ChefEq} attribute={this.state.attribute}/>
                    </div>
                </div>
                <input id="IdUpdatePreselectDoct" type="hidden" hidden onClick={()=>{
                    Axios.get(process.env.REACT_APP_API_URL+"/auth/doctPreselected",{
                        params:{
                            userid:Cookies.get("USERid")
                        }
                    })
                    .then(response=>{
                        if(response.data.error===true){
            
                        }else{
                            this.setState({
                                data:response.data.data
                            })
                        }
                    })
                }} />
                <input  id="showChooseEncForm" hidden type="texte" onClick={()=>{
                    this.setState({
                        stateAccepForm:"flex"
                    })
                }} />
                <div className={"sectionAcceptDoct "+this.state.stateAccepForm}>
                    <div className="sectionBarClose">
                        <CancelIcon onClick={()=>{
                            this.setState({
                                stateAccepForm:"none"
                            })
                        }} className="icon" />
                    </div>
                    <div className="content">
                        <p className="errorMessage">{this.state.mesgError}</p>
                        <input disabled id="idDoctAccpt" />
                        <select id="ChoixEncadrant" className="ChoixEncadrant">
                            <option value="-1">choisir un encadrant</option>
                            {this.state.ensgToEncad.map((ele,index)=>{
                                return (<option key={index} value={ele.id}>{ele.nom}</option>)
                            })}
                        </select>
                        <select id="ChoixCoEncadrant" className="ChoixEncadrant">
                            <option value="-1">choisir un coEncadrant</option>
                            {this.state.ensgToEncad.map((ele,index)=>{
                                return (<option key={index} value={ele.id}>{ele.nom}</option>)
                            })}
                        </select>
                        <button onClick={()=>{
                            this.setState({
                                mesgError:""
                            })
                            if(document.getElementById("ChoixEncadrant").value!=="-1" && document.getElementById("ChoixCoEncadrant").value!=="-1"){
                                if(document.getElementById("ChoixEncadrant").value!==document.getElementById("ChoixCoEncadrant").value){
                                    Axios.post(process.env.REACT_APP_API_URL+"/auth/selectPretDoct",{
                                        id:document.getElementById('idDoctAccpt').value,
                                        cmd:1,
                                        encadrant:document.getElementById("ChoixEncadrant").value,
                                        coencadrant:document.getElementById("ChoixCoEncadrant").value,
                                    })
                                    .then(resp=>{
                                        if(resp.data.error===true){

                                        }else {
                                            this.setState({
                                                stateAccepForm:"none",
                                            })
                                            document.getElementById("IdUpdatePreselectDoct").click()
                                        }
                                    })
                                }else{
                                    this.setState({
                                        mesgError:"Encadrant doit etre different du coEncadrant"
                                    })
                                }
                            }else{
                                this.setState({
                                    mesgError:"Il faut selectioner un encadrant"
                                })
                            }
                        }}>Accepter</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnsgDocotrantPreinscrit;