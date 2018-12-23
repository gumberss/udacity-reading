import React, { Component } from 'react';

import './ListGroup.css';

export default class ListGroup extends Component {

    state = {
        selectedName: ''
    }

    onSelect = (selectedData) => {
        this.setState({
            selectedName: selectedData.name
        })

        const { onSelect } = this.props

        onSelect && onSelect(selectedData)
    }

    componentWillReceiveProps({ data }) {
        if (data && data.length) 
            this.onSelect(data[0])
    }

    render() {

        const { data, title } = this.props
        const { selectedName } = this.state

        return (
            <ul className="list-group">
                {title && (
                    <li
                        className={`list-group-item list-group-item-action text-center disabled`}>
                        {title}
                    </li>
                )}
                {data && data.map(current => (
                    <li key={current.name}
                        onClick={() => this.onSelect(current)}
                        className={`list-group-item list-group-item-action ${selectedName === current.name ? 'active' : ''}`}>{current.name}</li>
                ))}
            </ul>
        );
    }
}
