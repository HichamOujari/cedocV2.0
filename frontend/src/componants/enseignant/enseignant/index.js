import React, { Component } from 'react';
import BarsEnseignant from "../barsEnseignant"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from "axios"
import Cookies from "js-cookie"


class EnsgEnseignants extends Component {
    contentAction =[
        {
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },
    ]
    state={
        structure:"",
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
          },
        ]
    }
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+"/auth/Ensg",{
            params:{
                userid:Cookies.get("USERid")
            }
        })
        .then(resp=> {
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    data:resp.data.data
                })
            }
        })
        Axios.post(process.env.REACT_APP_API_URL+'/auth/getEnsgAccountInfos',{
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
    }
    render() {
        return (
            <div>
                <BarsEnseignant ChefEq={this.props.ChefEq}/>
                <div className="MainEnseignants">
                    <PathingPage title="Enseignants" paths={["Cedoc Emi",this.props.grade,this.state.structure,"liste des enseignants"]}/>
                    <div className="Content">
                        <Table content={this.contentAction} action={true} title="La liste des enseignants" data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnsgEnseignants;