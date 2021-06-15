import React, { Component } from 'react';
import BarAdmin from "../shared/barAdmin"
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';

class BarsAdmin extends Component {
    SideEle=[
        {
            title:"Dashboard",
            path:"/admin",
            icon:<DashboardIcon className="icon" />,
            ele:[]
        },{
            title:"Doctorants",
            path:"#",
            icon:<GroupRoundedIcon className="icon" />,
            ele:[
                {
                    title:"Doctorants préinscrits",
                    path:"/admin/doctorant/preinscrit"
                },{
                    title:"Anciens doctorants",
                    path:"/admin/doctorant/"
                },
            ]
        },{
            title:"Structure de recherche",
            path:"#",
            icon:<AccountTreeRoundedIcon className="icon" />,
            ele:[
                {
                    title:"Equipe",
                    path:"/admin/structure/equipe"
                },{
                    title:"Laboratoire",
                    path:"/admin/structure/laboratoire"
                },{
                    title:"Centre",
                    path:"/admin/structure/centre"
                },
            ]
        },{
            title:"Enseignants",
            path:"/admin/enseignants",
            icon:<WorkRoundedIcon className="icon" />,
            ele:[]
        },
    ]
    render() {
        return (
            <BarAdmin profilPath={"/admin/profil"}  Eles={this.SideEle}/>
        );
    }
}

export default BarsAdmin;