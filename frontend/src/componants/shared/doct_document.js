import React, { Component } from 'react';
import "./style.css"
import axios from 'axios';
import DescriptionIcon from '@material-ui/icons/Description';
import CancelIcon from '@material-ui/icons/Cancel';

class DoctDocument extends Component {
    state={
        DoctError:false,
        stateShowDoct:"none",
        selectedDocData:"",
        files:[]
    }
    File  = ({index,name,type,data}) =>{
        return (<div key={index} onClick={()=>{
            console.log(this.state.selectedDocData)
            console.log(data)
            this.setState({
                selectedDocData:data,
                stateShowDoct:"flex"
            })
        }} className="file">
                <DescriptionIcon className="icon" />
                <p className="title">{name}</p>
                <p className="type">Type:<span>{type}</span></p>
            </div>)
    }
    componentDidMount(){
        axios.post(process.env.REACT_APP_API_URL+'/auth/getDoctFiles',{
            DoctID:this.props.idDoc,
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    DoctError:true,
                })
            }else{
                this.setState({
                    files:resp.data.data,
                })
            }
        })
    }
    render() {
        return (
            <div className="Content">
                {this.state.DoctError===true?<div className="Error404">
                    <p className="title">404</p>
                    <p className="text">NOT FOUND</p>
                </div>:
                <div className="files">
                    {this.state.files.map((ele,index)=>{
                        return (<this.File key={index} name={ele.name} type={"ele.type"} data={ele.data} />)
                    })}
                </div>}
                <div className={"showDoctFileSection "+this.state.stateShowDoct}>
                    <div className="CloseBar">
                        <CancelIcon onClick={()=>{
                            this.setState({
                                stateShowDoct:"none",
                                selectedDocData:""
                            })
                        }} className="CloseIcon" />
                    </div>
                    <iframe title="iframe" className="content" src={this.state.selectedDocData}></iframe>
                </div>
            </div>
        );
    }
}

export default DoctDocument;