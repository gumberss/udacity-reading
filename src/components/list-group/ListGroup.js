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
        if (data) this.onSelect(data[0])
    }

    render() {

        const { data, title, style, enableAllCategoryButton } = this.props
        const { selectedName } = this.state

        return (
            <div className={style ? '' : "list-group row"} style={style}>
                {title && (<button key='header'
                    disabled
                    type="button"
                    className={`list-group-item list-group-item-action`}>
                    {title}
                </button>)}
                {data && data.map(current => (
                    <button key={current.name}
                        onClick={() => this.onSelect(current)}
                        type="button"
                        className={`list-group-item list-group-item-action ${selectedName === current.name ? 'active' : ''}`}>
                        {current.name}
                    </button>
                ))}
            </div>
        );
    }
}
