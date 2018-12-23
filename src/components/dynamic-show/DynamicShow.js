import React, { Component } from 'react';

import posed from 'react-pose'

const Box = posed.div({
    left: { x: 0 },
    right: { x: 200,
        transition: {  type: 'spring', stiffness: 100  }
     },
    
  })

export default class DynamicShow extends Component {

    state = {
        pose: 'left'
    }

    toggle = () => {
        this.setState({
            pose: this.state.pose === 'left' ? 'right' : 'left'
        })
    }

    render() {
     


        return (<Box
            pose={this.state.pose}
            className="box"
                onClick={this.toggle}>
                {this.props.children}
        </Box>)
    }
}
