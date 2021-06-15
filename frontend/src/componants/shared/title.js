import React, { Component } from 'react';
import "./style.css"

export default class Title extends Component {
    render() {
        return (
            <div className="TitleComp">
                <p className="title">{this.props.title}</p>
                <div className="border">
                    <div className="black"></div>
                    <div className="vert"></div>
                    <div className="black"></div>
                </div>
            </div>
        );
    }
}