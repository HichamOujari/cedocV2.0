import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CloseIcon from '@material-ui/icons/Close';
import Input from "../../shared/input"
import Axios from "axios"

class Enseignants extends Component {
    InitialEnsgSelected = {
        email: "",
        grade: "",
        id: 0,
        nom: "",
        prenom: "",
        specialite: "",
        structure: "",
        tele:0,
        idgrade :0,
        idStructure:0
    }
    contentAction =[
        {
            Components:EditRoundedIcon,
            className:"text-black",
            idBtn:"UpdateForm",
            isUpdateBtn:true
        },{
            Components:DeleteSweepRoundedIcon,
            className:"text-danger",
            isDeleteBtn:true,
            path:process.env.REACT_APP_API_URL+"/auth/DeleteEnsg"
        },
    ]
    state={
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
                nomDATA:"tele",
                nickname:"Tele"
            },{
                nomDATA:"grade",
                nickname:"Grade"
            },{
                nomDATA:"structure",
                nickname:"Structure"
            }
        ],
        status:"none",
        AddEnsg:"none",
        UpdateEnsg:"none",
        EnsgSelected:this.InitialEnsgSelected,
        structure:[],
        grades:[]
    }
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+"/auth/Ensg")
        .then(resp=> {
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    data:resp.data.data
                })
            }
        })
        Axios.get(process.env.REACT_APP_API_URL+"/auth/listStruct")
        .then(resp=> {
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    structure:resp.data.data
                })
            }
        })
        Axios.get(process.env.REACT_APP_API_URL+"/auth/getGrade")
        .then(resp=> {
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    grades:resp.data.data
                })
            }
        })
    }
    addEnsg =(e)=>{
        e.preventDefault()
        const nom = document.getElementById("IdNewEnsgnom")
        const prenom = document.getElementById("IdNewEnsgprenom")
        const email = document.getElementById("IdNewEnsgemail")
        const tele = document.getElementById("IdNewEnsgtele")
        const specialite = document.getElementById("IdNewEnsgspecialite")
        const grade = document.getElementById("IdNewEnsggrade")
        const structure = document.getElementById("IdNewEnsgstructure")
        if(grade.value==="-1") grade.style.border="2px solid red"
        else{
            Axios.post(process.env.REACT_APP_API_URL+"/auth/addEnsg",{
                nom:nom.value,
                prenom:prenom.value,
                email:email.value,
                tele:tele.value,
                specialite:specialite.value,
                grade:grade.value,
                structure:structure.value==="-1"?null:structure.value,
            })
            .then(resp=>{
                if(resp.data.error===true) this.setState({
                    isErrorAdd:true,
                    MsgErro:resp.data.message.message.sqlMessage
                })
                else{
                    this.setState({
                        AddEnsg:"none",
                        isErrorAdd:false
                    })
                    Axios.get(process.env.REACT_APP_API_URL+"/auth/Ensg")
                    .then(resp=> {
                        if(resp.data.error===true){
                            //err
                        }else{
                            this.setState({
                                data:resp.data.data
                            })
                        }
                    })
                }
            })
        }
    }
    updateEnsg = (e)=>{
        e.preventDefault()
        const nom = document.getElementById("IdUpdateEnsgnom")
        const prenom = document.getElementById("IdUpdateEnsgprenom")
        const email = document.getElementById("IdUpdateEnsgemail")
        const tele = document.getElementById("IdUpdateEnsgtele")
        const specialite = document.getElementById("IdUpdateEnsgspecialite")
        const grade = document.getElementById("IdUpdateEnsggrade")
        const structure = document.getElementById("IdUpdateEnsgstructure")

        Axios.post(process.env.REACT_APP_API_URL+"/auth/UpdateEnsg",{
            id:this.state.EnsgSelected.id,
            nom:nom.value,
            prenom:prenom.value,
            email:email.value,
            tele:tele.value,
            specialite:specialite.value,
            grade:grade.value,
            structure:structure.value,
        }).then(resp=>{
            if(resp.data.error===true) this.setState({
                isErrorAdd:true,
                MsgErro:resp.data.message,
            })
            else{
                this.setState({
                    UpdateEnsg:"none",
                    isErrorAdd:false
                })
                Axios.get(process.env.REACT_APP_API_URL+"/auth/Ensg")
                .then(resp=> {
                    if(resp.data.error===true){
                        //err
                    }else{
                        this.setState({
                            data:resp.data.data
                        })
                    }
                })
                console.log(resp.data)
            }
        })
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainEnseignants">
                    <PathingPage title="Enseignants" paths={["Cedoc Emi","Admin","Enseignants"]}/>
                    <div className="Content">
                        <div className="AddMore">
                            <AddRoundedIcon className="icon"/>
                            <p onClick={()=>{
                                this.setState({
                                    AddEnsg:"flex"
                                })
                            }} className="title">Ajouter un nouveau enseignant</p>
                        </div>
                        <Table content={this.contentAction} action={true} title="La liste des enseignants" data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
                
                <div className={"FormInfosComp "+this.state.AddEnsg}>
                    <form onSubmit={this.addEnsg} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                AddEnsg:"none",
                                isErrorAdd:false
                            })
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            {
                                this.state.attribute.map((ele,index)=>{
                                    if(index<this.state.attribute.length-2) return <Input key={index} title={ele.nickname} type="text" ID={"IdNewEnsg"+ele.nomDATA} IsRequired={true} name={ele.nomDATA} placeholder={ele.nickname} />
                                    return null
                                })
                            }
                            <Input title={"Specialite"} type="text" IsRequired={true} name={"specialite"} ID={"IdNewEnsgspecialite"} placeholder={"specialite"} />
                            <div className="TextInput">
                                <p className="title">Grade</p>
                                <select className="input" required id={"IdNewEnsggrade"}  name={"gradeId"}>
                                    <option value="-1">Choisir un grade</option>
                                    {this.state.grades.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                            <div className="TextInput">
                                <p className="title">liste des structures</p>
                                <select className="input" id={"IdNewEnsgstructure"}  name={"structureNom"}>
                                    <option value="-1">Selectioner une stucture</option>
                                    {this.state.structure.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.isErrorAdd===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Ajouter" />
                    </form>
                </div>
                <div className={"FormInfosComp "+this.state.UpdateEnsg}>
                    <form onSubmit={this.updateEnsg} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                UpdateEnsg:"none",
                                isErrorAdd:false
                            })
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            {
                                this.state.attribute.map((ele,index)=>{
                                    if(index<this.state.attribute.length-2) return <Input key={index} title={ele.nickname} type="text" ID={"IdUpdateEnsg"+ele.nomDATA} IsRequired={true} name={ele.nomDATA} placeholder={ele.nickname} />
                                    return null
                                })
                            }
                            <Input title={"Specialite"} value={this.state.EnsgSelected.specialite} type="text" onChange={()=>{}} IsRequired={true} name={"specialite"} ID={"IdUpdateEnsgspecialite"} placeholder={"specialite"} />
                            <div className="TextInput">
                                <p className="title">Grade</p>
                                <select className="input" required id={"IdUpdateEnsggrade"}  name={"gradeId"}>
                                    <option value={this.state.EnsgSelected.idgrade}>{this.state.EnsgSelected.grade}</option>
                                    {this.state.grades.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                            <div className="TextInput">
                                <p className="title">liste des structures</p>
                                <select className="input" id={"IdUpdateEnsgstructure"}  name={"structureNom"}>
                                    <option value={this.state.EnsgSelected.idStructure===null?"null":this.state.EnsgSelected.idStructure}>{this.state.EnsgSelected.structure===null?"Choisir une structure":this.state.EnsgSelected.structure}</option>
                                    {this.state.structure.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.isErrorAdd===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Modifier" />
                    </form>
                </div>
                
                <input id="AfterDelete" hidden type="submit" onClick={()=>{
                    Axios.get(process.env.REACT_APP_API_URL+"/auth/Ensg")
                    .then(resp=> {
                        if(resp.data.error===true){
                            //err
                        }else{
                            this.setState({
                                data:resp.data.data
                            })
                        }
                    })
                }} />
                <input id="UpdateForm" hidden type="submit" value="-" onClick={(e)=>{
                    Axios.post(process.env.REACT_APP_API_URL+"/auth/GetEnsg",{
                        ID:e.target.value
                    })
                    .then(resp=>{
                        if(resp.data.error===true)this.setState({
                            isErrorAdd:true,
                            MsgErro:resp.data.message,
                            EnsgSelected:this.InitialEnsgSelected
                        })
                        else {
                            this.setState({
                                EnsgSelected:resp.data.data
                            })
                            document.getElementById("IdUpdateEnsgnom").value=resp.data.data.nom
                            document.getElementById("IdUpdateEnsgprenom").value=resp.data.data.prenom
                            document.getElementById("IdUpdateEnsgemail").value=resp.data.data.email
                            document.getElementById("IdUpdateEnsgtele").value=resp.data.data.tele
                            document.getElementById("IdUpdateEnsgspecialite").value=resp.data.data.specialite
                        }
                    })
                    document.getElementById("IdUpdateEnsgstructure").selectedIndex =0
                    document.getElementById("IdUpdateEnsggrade").selectedIndex =0
                    this.setState({
                        UpdateEnsg:"flex"
                    })
                }} onChange={(e)=>{}}/>
            </div>
        );
    }
}

export default Enseignants;