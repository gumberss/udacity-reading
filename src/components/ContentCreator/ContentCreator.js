import React, { Component } from 'react';

import { connect } from 'react-redux'

import './ContentCreator.css'

import ListGroup from '../list-group/ListGroup'
import TextInput from '../text-input/TextInput'

class ContentCreator extends Component {

    state = {
        content: '',
        category: {},
        author: 'Estudante'
    }

    onContentChange = e => {

        this.setState({
            content: e.target.value
        })
    }

    onChangeCategorySelected = category => {
        this.setState({
            category
        })
    }

    onSubmit = e => {
        e.preventDefault();

    }

    render() {

        return (
            <div id="content-creator">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 content-creator-item">
                            <ListGroup
                                data={this.props.categories}
                                onChange={this.onChangeCategorySelected}
                                title="Selecione a categoria do seu post"
                            />
                        </div>
                        <div className="col-sm-12 col-md-8 content-creator-item">
                            <TextInput
                                multiline
                                rows={7}
                                onChange={this.onContentChange}
                                value={this.state.content}
                                title="O que gostaria de compartilhar hoje?"
                            />
                        </div>
                    </div>
                    <div className="row content-creator-footer">
                        <button
                            type="submit"
                            className="btn btn-outline-primary">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return {
        categories: Object.values(categories)
    }
}

export default connect(mapStateToProps)(ContentCreator)
