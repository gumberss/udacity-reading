import React, { Component } from 'react';
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'

import './VoteScore.css'

export default class VoteScore extends Component {
    render() {

        const { upEvent, downEvent, score } = this.props

        return (
            <div className="vote-score__div">

                <TiThumbsUp
                    size={22}
                    color="green"
                    onClick={upEvent}
                />

                <span style={{ color: score >= 0 ? 'green' : 'red' }}>
                    {score}
                </span>

                <TiThumbsDown
                    size={22}
                    color="red"
                    onClick={downEvent}
                />
            </div>
        );
    }
}
