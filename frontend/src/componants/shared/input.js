import React, { Component } from 'react';

export default class Input extends Component {
    render() {
        return (<div className="TextInput">
            <p className="title">{this.props.title}</p>
            <input id={this.props.ID} value={this.props.value} onChange={(e)=>{}} className="input" type={this.props.type} required={this.props.IsRequired} name={this.props.name} placeholder={this.props.placeholder}/>
        </div>)
    }
}
