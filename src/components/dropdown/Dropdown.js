import React, { Component } from 'react';

import './Dropdown.css';

export default class Dropdown extends Component {

    state = {
        selectedItem:''
    }

    onSelect = e => {

    }


    render() {

        const { firstTitle } = this.props

        return (
            <div className="dropdown-container">
                <a className="dropdown-content btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {firstTitle}
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </ul>
            </div>
        );
    }
}
