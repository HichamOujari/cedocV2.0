import React, { Component } from 'react';
import "./style.css"
import CloseIcon from '@material-ui/icons/Close';
import Axios from "axios"

const Input = ({title,type,placeholder,IsRequired,disable})=>{
    return (<div className="TextInput">
        <p className="title">{title}</p>
        <input type={type} required={IsRequired} disabled value={placeholder!==null?placeholder:" "}/>
    </div>)
}

class FormInfos extends Component {
    state={
        data:{
            doct:[],
            ensg:[],
            equipe:[],
            labo:[],
        }
    }
    ListMember = () =>{   
        return (<div className="Members">
                <p className="title">Liste des members :</p>
                {
                    Object.keys(this.state.data).map((typeMembre,index)=>{
                        if(this.state.data[typeMembre].length!==0){
                            return (<div key={index} className="MemberComp">
                                        <p className="TypeMember">{typeMembre} : </p>
                                        <div className="Contents">
                                            {this.state.data[typeMembre].map((ele,i)=>{
                                                return <p key={i} className="ele">{ele.nom}</p>
                                            })}
                                        </div>
                                    </div>)
                        }
                        return null
                    })
                }
        </div>)
    }
    render() {
        return (
            <div className={"FormInfosComp "+this.props.status}>
                 <div className="FormContent">
                    <p onClick={()=>{
                        document.getElementById("IDviewIcon").click();
                    }} className="closeIcon"><CloseIcon /></p>

                    <div className="formInputs">
                        {
                            this.props.data.map((ele,index)=>{
                                if(index===this.props.id) return Object.keys(ele).map((sousEle,sousIndex)=>
                                <Input key={sousIndex} title={sousEle} type="text" disable={true} placeholder={ele[sousEle]} />)
                                return null
                            })
                        }
                    </div>
                    {
                        this.props.isStruct===true?this.ListMember():null
                    }
                 </div>
                 <input hidden id="IdGetMemberData" onClick={(e)=>{
                     Axios.post(process.env.REACT_APP_API_URL+'/auth/GetMembers',{ID:e.target.value})
                     .then(resp=>{
                         this.setState({
                             data:resp.data.data
                         })
                     })
                 }} />
            </div>
        );
    }
}

export default FormInfos;