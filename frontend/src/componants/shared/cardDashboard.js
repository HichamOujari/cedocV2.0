import React, { Component } from 'react';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import "./style.css"

class CardDashboard extends Component {
    render() {
        return (
            <div className={"CardDashboardComp "+this.props.color}>
                <p className="title">{this.props.title}</p>
                <div>
                    <p className="nbr">{this.props.nbr}</p>
                    <p className="type">{this.props.type}</p>
                </div>
                <AssessmentRoundedIcon className="icon"/>
            </div>
        );
    }
}

export default CardDashboard;