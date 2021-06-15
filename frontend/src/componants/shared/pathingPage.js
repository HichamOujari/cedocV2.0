import React, { Component } from 'react';

class PathingPage extends Component {
    render() {
        return (
            <div className="PathingPageComp">
                <p className="title">{this.props.title}</p>
                <div className="path">
                    {
                        this.props.paths.map((ele,index)=>{
                            if(index!==this.props.paths.length-1){
                                return (<p key={index} className="first">{ele+" / "}</p>)
                            }
                            return (<p key={index} className="last">{ele}</p>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default PathingPage;