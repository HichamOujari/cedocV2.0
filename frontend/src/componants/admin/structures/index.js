import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import Input from "../../shared/input"
import Axios from "axios"

class Structure extends Component {
    contentAction =[
        {
            Components:EditRoundedIcon,
            className:"text-black",
            idBtn:"UpdateForm",
            isUpdateBtn:true
        },{
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },{
            Components:DeleteSweepRoundedIcon,
            className:"text-danger",
            isDeleteBtn:true,
            path:"http://localhost:3001/auth/DeleteStruct"
        },
    ]
    state={
        data : [],
        attribute:[
          {
              nomDATA:"nom",
              nickname:"Nom",
          },{
              nomDATA:"acronyme",
              nickname:"Acronyme",
          },{
              nomDATA:"date",
              nickname:"Date de création",
          },{
              nomDATA:"chef",
              nickname:"Chef"
          },{
              nomDATA:"theme",
              nickname:"Theme"
          },
        ],
        NewMemberState:"none",
        AddStructure:"none",
        Enseignants:[],
        isErrorAdd:false,
        MsgErro:"",
        TypeStructid:this.props.id,
        UpdateStructure:"none",
        isErrorUpdate:false,
        DataSelectedItem:{},
        membersEnsg:[],
        membersEquipe:[],
        membersLabo:[],
        selectedStructId:0,
        newMemberToAdd:[]
    }
    addStructure = (e)=>{
        e.preventDefault()

        const nom = document.getElementById("IdAddStructNom")
        const acronyme = document.getElementById("IdAddStructAcronyme")
        const date = document.getElementById("IdAddStructDateC")
        const chef = document.getElementById("IdAddStructChef")
        const theme = document.getElementById("IdAddStructTheme")

        Axios.post("http://localhost:3001/auth/AddStructure",{
            nom:nom.value,
            acronyme:acronyme.value,
            date:date.value,
            chef:chef.value,
            theme:theme.value,
            type:this.state.TypeStructid
        }).then(resp=>{
            if(resp.data.error===true) this.setState({
                isErrorAdd:true,
                MsgErro:resp.data.message
            })
            else{
                this.setState({
                    AddStructure:"none",
                    isErrorAdd:false
                })
                Axios.post("http://localhost:3001/auth/GetStructureByType",{
                    type:this.state.TypeStructid
                })
                .then(resp=>{
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
    reloadData = ()=>{
        document.getElementById("ChefInSelect").innerHTML = "Choisir un chef";
        Axios.post("http://localhost:3001/auth/getEnsgSameStruct",{
            idStruct : this.state.selectedStructId
        })
        .then(resp=>{
            if(resp.data.error===false){
                this.setState({
                    membersEnsg:resp.data.data
                })
            }
        })
    }
    updateStructure = (e)=>{
        e.preventDefault()
        var nom = document.getElementById("IdUpdateStructNom").value
        var acronyme = document.getElementById("IdUpdateStructAcronyme").value
        var chef = document.getElementById("IdUpdateStructChef").value
        var date = document.getElementById("IdUpdateStructDateC").value
        var theme = document.getElementById("IdUpdateStructTheme").value
        Axios.post("http://localhost:3001/auth/UpdateStructureById",{
            nom:nom,
            acronyme:acronyme,
            chef:chef,
            date:date,
            theme:theme,
            idStruct:this.state.selectedStructId
        }).then(resp=>{
            if(resp.data.error===false){
                document.getElementById("AfterDelete").click()
                document.getElementById("ChefInSelect").innerHTML="Choisir un chef"
                this.setState({
                    UpdateStructure:"none"
                })
            }else{
                
            }
        })
    }
    componentDidMount(){
        Axios.post("http://localhost:3001/auth/GetStructureByType",{
            type:this.state.TypeStructid
        })
        .then(resp=>{
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    data:resp.data.data
                })
            }
        })
    }
    getMembers = (id)=>{
        Axios.post("http://localhost:3001/auth/GetMembers",{
            ID:id
        })
        .then(resp=>{
            if(resp.data.error===false){
                
                this.setState({
                    membersEnsg:resp.data.data["Enseignants"],
                    membersEquipe:resp.data.data["Equipe"],
                    membersLabo:resp.data.data["Laboratoire"]
                })
            }
        })
    }
    affectDataToUpdate = (data)=>{
        this.getMembers(data.id)
        document.getElementById("AfterDelete").click()
        document.getElementById("IdUpdateStructNom").value=data.nom
        document.getElementById("IdUpdateStructAcronyme").value=data.acronyme
        document.getElementById("IdUpdateStructTheme").value=data.theme
        document.getElementById("IdUpdateStructDateC").value=(data.date)
        this.reloadData()
        if(data.chef!==null) document.getElementById("ChefInSelect").innerHTML=data.chef
        this.setState({
            selectedStructId:data.id
        })
    }
    addMember = (type) =>{
        this.setState({
            NewMemberState:"flex"
        })
        document.getElementById("IdSelectNewMember").setAttribute("name",type);
        if(type.includes("ensg")){
            Axios.post("http://localhost:3001/auth/getNewMemberToAdd",{
                type:"ensg"
            })
            .then(resp=>{
                if(resp.data.error===false){
                    this.setState({
                        newMemberToAdd:resp.data.data
                    })
                }
            })
        }else if(type.includes("equipe")){
            Axios.post("http://localhost:3001/auth/getNewMemberToAdd",{
                type:"equipe"
            })
            .then(resp=>{
                if(resp.data.error===false){
                    this.setState({
                        newMemberToAdd:resp.data.data
                    })
                }
            })
        }else if(type.includes("labo")){
            Axios.post("http://localhost:3001/auth/getNewMemberToAdd",{
                type:"labo"
            })
            .then(resp=>{
                if(resp.data.error===false){
                    this.setState({
                        newMemberToAdd:resp.data.data
                    })
                }
            })
        }
    }
    AddNewMember = (e)=>{
        e.preventDefault();
        var selectedEle = document.getElementById("IdSelectNewMember").value
        Axios.post("http://localhost:3001/auth/AddMember",{
            IdStruct:this.state.selectedStructId,
            idMembre: selectedEle,
            type:document.getElementById("IdSelectNewMember").name
        })
        .then(resp=>{
            if(resp.data.error===false){
                this.getMembers(this.state.selectedStructId)
                this.setState({
                    NewMemberState:"none"
                })   
            }
        })
    }
    componentDidUpdate(){
        if(this.props.id!==this.state.TypeStructid){
            this.setState({
                TypeStructid:this.props.id
            })
            Axios.post("http://localhost:3001/auth/GetStructureByType",{
                type:this.props.id
            })
            .then(resp=>{
                if(resp.data.error===true){
                    //err
                }else{
                    this.setState({
                        data:resp.data.data
                    })
                }
            })
        }
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainStructure">
                    <PathingPage title="Struture de recherche" paths={["Cedoc Emi","Admin","Struture de recherche",this.props.structure]}/>
                    <div className="Content">
                        <div onClick={()=>{
                                Axios.get("http://localhost:3001/auth/GetNewChef")
                                .then(resp=> {
                                    if(resp.data.error===true){
                                        //err
                                    }else{
                                        this.setState({
                                            Enseignants:resp.data.data
                                        })
                                    }
                                })
                                this.setState({
                                    AddStructure:"flex"
                                })
                            }} className="AddMore">
                            <AddRoundedIcon className="icon"/>
                            <p className="title">Ajouter un nouveau {this.props.structure}</p>
                        </div>
                        <Table content={this.contentAction} action={true} title={"Affichage des "+this.props.structure+"s"} isStruct={true} data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
                <div className={"FormInfosComp "+this.state.AddStructure}>
                    <form onSubmit={this.addStructure} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                AddStructure:"none"
                            })
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            <Input title={"Nom"} type="text" ID="IdAddStructNom" IsRequired={true} name={"nom"} placeholder={"Tapez le nom de la structure"} />
                            <Input title={"Acronyme"} type="text" ID="IdAddStructAcronyme" IsRequired={true} name={"acronyme"} placeholder={"Tapez l'Acronyme de la structure"} />
                            <Input title={"Date de création"} type="date" ID="IdAddStructDateC" IsRequired={true} name={"dateC"} />
                            <Input title={"Theme"} type="text" IsRequired={true} ID="IdAddStructTheme" name={"theme"} placeholder={"Entrez le Theme de la structure"} />
                            <div className="TextInput">
                                <p className="title">Chef du structure</p>
                                <select className="input" id="IdAddStructChef" required name={"structureNom"}>
                                    <option value="null">Choisir un chef</option>
                                    {this.state.Enseignants.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.isErrorAdd===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Ajouter" />
                    </form>
                </div>
                
                
                <div className={"FormInfosComp "+this.state.UpdateStructure}>
                    <form onSubmit={this.updateStructure} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                UpdateStructure:"none"
                            })
                            document.getElementById("ChefInSelect").innerHTML="Choisir un chef"
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            <Input title={"Nom"} type="text" ID="IdUpdateStructNom" IsRequired={true} name={"nom"} placeholder={"Tapez le nom de la structure"} />
                            <Input title={"Acronyme"} type="text" ID="IdUpdateStructAcronyme" IsRequired={true} name={"acronyme"} placeholder={"Tapez l'Acronyme de la structure"} />
                            <Input title={"Date de création"} type="date" ID="IdUpdateStructDateC" IsRequired={true} name={"dateC"} />
                            <Input title={"Theme"} type="text" IsRequired={true} ID="IdUpdateStructTheme" name={"theme"} placeholder={"Entrez le Theme de la structure"} />
                            <div className="TextInput">
                                <p className="title">Chef du structure</p>
                                <select className="input" id="IdUpdateStructChef" required name={"structureNom"}>
                                    <option id="ChefInSelect" value="null">Choisir un chef</option>
                                    {this.state.membersEnsg.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="Members">
                            <p className="title">Liste des members :</p>
                            <div className="ensemble">
                                <div className="header">
                                    <p className="title">Enseignants :</p>
                                    <div className="add">
                                        <AddRoundedIcon className="icon" />
                                        <p onClick={()=>{
                                                this.addMember("ensg")
                                            }} className="title">Ajouter des Enseignants</p>
                                    </div>
                                </div>
                                <div className="items">
                                    {
                                        this.state.membersEnsg.map((ele,index)=>{
                                            return <div key={index} className="item">
                                            <p className="name">{ele.nom}</p>
                                            <CloseIcon onClick={()=>{
                                                Axios.post("http://localhost:3001/auth/RetireMembre",{
                                                    IDUser:ele.id
                                                }).then(resp=>{
                                                    //if(resp.data.data===1){
                                                        this.reloadData()
                                                    //}
                                                })
                                                this.getMembers(this.state.selectedStructId)
                                            }} className="icon"/>
                                        </div>
                                        })
                                    }
                                </div>
                            </div>
                            {
                                (this.props.structure.toLowerCase().includes("labo") || this.props.structure.toLowerCase().includes("centre"))?
                                <div className="ensemble">
                                    <div className="header">
                                        <p className="title">Equipe :</p>
                                        <div className="add">
                                            <AddRoundedIcon className="icon" />
                                            <p onClick={()=>{
                                                this.addMember("equipe")
                                            }} className="title">Ajouter des Equipes</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        {
                                            this.state.membersEquipe.map((ele,index)=>{
                                                return <div key={index} className="item">
                                                <p className="name">{ele.nom}</p>
                                                <CloseIcon onClick={()=>{
                                                    Axios.post("http://localhost:3001/auth/RetireMembre",{
                                                        IDStruct:ele.id
                                                    }).then(resp=>{
                                                        //if(resp.data.data===1){
                                                            this.reloadData()
                                                        //}
                                                    })
                                                    this.getMembers(this.state.selectedStructId)
                                                }} className="icon"/>
                                            </div>
                                            })
                                        }
                                    </div>
                                </div>:
                                null
                            }
                            {
                                this.props.structure.toLowerCase().includes("centre")?
                                <div className="ensemble">
                                    <div className="header">
                                        <p className="title">Laboratoire :</p>
                                        <div className="add">
                                            <AddRoundedIcon className="icon" />
                                            <p onClick={()=>{
                                                this.addMember("labo")
                                            }} className="title">Ajouter des labo</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        {
                                            this.state.membersLabo.map((ele,index)=>{
                                                return <div key={index} className="item">
                                                <p className="name">{ele.nom}</p>
                                                <CloseIcon onClick={()=>{
                                                    Axios.post("http://localhost:3001/auth/RetireMembre",{
                                                        IDStruct:ele.id
                                                    })
                                                    .then(resp=>{
                                                        //if(resp.data.data===1){
                                                            this.reloadData()
                                                        //}
                                                    })
                                                    this.getMembers(this.state.selectedStructId)
                                                }} className="icon"/>
                                            </div>
                                            })
                                        }
                                    </div>
                                </div>:null
                            }
                        </div>
                        {this.state.isErrorUpdate===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Modifier" />
                    </form>
                </div>
                
                <div className={"newMember "+this.state.NewMemberState}>
                    <div className="backG"></div>
                    <form onSubmit={(e)=>this.AddNewMember(e)} className="form">
                        <p className="title">Nouveau membre :<CloseIcon onClick={()=>this.setState({
                            NewMemberState:"none"
                        })} className="iconClose" /></p>
                        
                        <select id="IdSelectNewMember">
                            {
                                this.state.newMemberToAdd.map((ele,index)=>{
                                    return <option key={index} value={ele.id}>{ele.nom}</option>
                                })
                            }
                        </select>
                        <input className="SubmitBtn" value="Ajouter" type="submit" />
                    </form>
                </div>
                
                <input id="AfterDelete" hidden type="submit" onClick={()=>{
                        Axios.post("http://localhost:3001/auth/GetStructureByType",{
                            type:this.state.TypeStructid
                        })
                        .then(resp=>{
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
                    const idStruct = e.target.value
                    //Axios.post("http://localhost:3001/auth/getStructById")
                    this.state.data.map((ele)=>ele.id===parseInt(idStruct)?
                        this.affectDataToUpdate(ele)
                    :null)
                    this.setState({
                        UpdateStructure:"flex",
                        isErrorUpdate:false,
                    })
                    }} onChange={(e)=>{}}/>
            </div>
        );
    }
}

export default Structure;