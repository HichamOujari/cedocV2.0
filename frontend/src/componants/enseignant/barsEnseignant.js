import React, { Component } from 'react';
import BarAdmin from "../shared/barAdmin"
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

class BarsEnseignant extends Component {
    SideEle=[
        {
            title:"Dashboard",
            path:this.props.ChefEq===true?"/chef":"/enseignant",
            icon:<DashboardIcon className="icon" />,
            ele:[]
        },{
            title:"Doctorants",
            path:"#",
            icon:<GroupRoundedIcon className="icon" />,
            ele:[
                {
                    title:"Doctorants préinscrits",
                    path:this.props.ChefEq===true?"/chef/doctorant/preinscrit":"/enseignant/doctorant/preinscrit"
                },{
                    title:"Anciens doctorants",
                    path:this.props.ChefEq===true?"/chef/doctorant":"/enseignant/doctorant/"
                },
            ]
        },{
            title:"Enseignants",
            path:this.props.ChefEq===true?"/chef/enseignants":"/enseignant/enseignants",
            icon:<WorkRoundedIcon className="icon" />,
            ele:[]
        },
    ]

    componentDidMount(){
        //this.props.ChefEq!==
        if(true){
            this.SideEle = [...this.SideEle,{
                title:"Mes Doctorants",
                path:"/enseignant/mes-doctorants",
                icon:<RecordVoiceOverIcon className="icon" />,
                ele:[]
            }]
        }
    }
    
    render() {
        return (
            <BarAdmin profilPath={this.props.ChefEq===true?"/chef/profil":"/enseignant/profil"} Eles={this.SideEle}/>
        );
    }
}

export default BarsEnseignant;