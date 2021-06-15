import React, { Component } from 'react';
import "./style.css"
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormInfos from "./formInfo"
import Axios from "axios"
import {Link} from "react-router-dom"

class Table extends Component {
    state = {
        attribute : this.props.attribute,
        data : this.props.data,
        statusFormDetailNbr:0,
        selectedElement:0,
        isErrorDelete:false,
        errorMesg:"",
        IdSelectedEle:0,
    }
    sortBy = (Sortby)=>{
        return function(a, b) {    
            if (a[Sortby] > b[Sortby]) {    
                return 1;    
            } else if (a[Sortby] < b[Sortby]) {    
                return -1;    
            }    
            return 0;
        }   
    }
    render() {
        return (
            <div className={"TableComp "+this.props.className}>
                    {this.state.isErrorDelete===true?<p className="NotUploaded">{this.state.errorMesg}</p>:null}
                    <p className="title">{this.props.title}</p>
                    <table>
                        <thead>
                            <tr>
                                {this.state.attribute.map((ele,index)=>{
                                    return (<th onClick={()=>this.setState({
                                        data:this.props.data.sort(this.sortBy(ele.nomDATA))
                                    })} key={index}>
                                        <div className="Attribute">
                                            <p className="title">{ele.nickname}</p>
                                            <ul className="icons">
                                                <li><ArrowDropUpIcon /></li>
                                                <li><ArrowDropDownIcon /></li>
                                            </ul>
                                        </div>
                                    </th>)
                                })}
                                {this.props.action!==true?null:<th>
                                        <div className="Attribute">
                                            <p className="title">Action</p>
                                        </div>
                                    </th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((ele,index)=>(<tr key={index}>
                                    {
                                        this.state.attribute.map((sousEle,sousIndex)=>(<td key={sousIndex}>{ele[sousEle.nomDATA]}</td>))
                                    }
                                    {this.props.action!==true?null:<td>
                                    <div className="Attribute">
                                        {this.props.content.map((Icon,i)=>{
                                            if(Icon.isVisibleBtn === true) return (<Icon.Components onClick={()=>{
                                                this.setState({
                                                    statusFormDetailNbr:this.state.statusFormDetailNbr+1,
                                                    selectedElement:index,
                                                    IdSelectedEle:ele.id
                                                })
                                                document.getElementById("IdGetMemberData").value=ele.id;
                                                document.getElementById("IdGetMemberData").click();
                                            }} key={i} className={Icon.className}/>)
                                            
                                            else if(Icon.isDeleteBtn === true) return (<Icon.Components onClick={()=>{
                                                Axios.post(Icon.path,{
                                                    ID:ele.id
                                                })
                                                .then(resp=>{
                                                    if(resp.data.error===false){
                                                        document.getElementById("AfterDelete").click();
                                                    }else{
                                                        this.setState({
                                                            isErrorDelete:true,
                                                            errorMesg:resp.data.message
                                                        })
                                                    }
                                                })
                                            }} key={i} className={Icon.className}/>)
                                            
                                            else if(Icon.isUpdateBtn === true) return (<Icon.Components onClick={()=>{
                                                document.getElementById(Icon.idBtn).value=ele.id
                                                document.getElementById(Icon.idBtn).click()
                                            }} key={i} className={Icon.className}/>)
                                            
                                            else if(Icon.isAcceptBtn === true) return (<Icon.Components key={i} id={ele.id} chef={this.props.ChefEq} className={Icon.className}/>)
                                            
                                            else if(Icon.isRefuseBtn === true) return (<Icon.Components key={i} id={ele.id} chef={this.props.ChefEq} className={Icon.className}/>)
                                            

                                            else if(Icon.isFolderBtn === true) return (<Link key={i} to={Icon.path+ele.id}><Icon.Components className={Icon.className}/></Link>)

                                            else if(Icon.isVisibleFileBtn === true) return (<a key={i} href={ele.data} download={ele.name} ><Icon.Components className={Icon.className}/></a>)

                                            else if(Icon.isDeleteFileBtn === true) return (<div key={i} onClick={()=>{
                                                document.getElementById("IdFileDelete").setAttribute("value",ele.id)
                                                document.getElementById("IdFileDelete").click();
                                            }}> <Icon.Components className={Icon.className}/></div>)
                                            
                                            return <Icon.Components key={i} className={Icon.className}/>
                                        })}
                                    </div>
                                </td>}
                                </tr>))}
                        </tbody>
                        <tfoot>
                            
                        </tfoot>
                    </table>
                    <input type="hidden" id="IDviewIcon" onClick={()=>{
                        this.setState({
                            statusFormDetailNbr:this.state.statusFormDetailNbr+1,
                        })
                    }} />
                    <FormInfos id={this.state.selectedElement} isStruct={this.props.isStruct} IdSelectedEle={this.state.IdSelectedEle} data={this.props.data} status={this.state.statusFormDetailNbr%2===0?"none":"flex"}/>
                </div>
        );
    }
}

export default Table;