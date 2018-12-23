import React, { Component } from 'react';
import { connect } from 'react-redux'

import './ContentCreator.css'

import newId from 'uuid/v1'

import ListGroup from '../list-group/ListGroup'
import TextInput from '../text-input/TextInput'
import { Link } from 'react-router-dom'


class ContentCreator extends Component {

    state = {
        content: '',
        title: '',
        category: {}
    }

    onContentChange = e => {

        this.setState({
            content: e.target.value
        })
    }

    onChangeCategorySelected = category => {
        debugger;
        this.setState({
            category: category
        })
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    render() {

        return (
            <div id="content-creator">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 content-creator-item">
                            <ListGroup
                                data={this.props.categories.filter(x => x.name !== 'todos')}
                                onChange={this.onChangeCategorySelected}
                                title="Selecione a categoria"
                            />
                        </div>

                        <div className="col-sm-12 col-md-8">
                            <TextInput
                                onChange={this.onTitleChange}
                                value={this.state.title}
                                title="O que gostaria de compartilhar hoje?"
                            />

                            <TextInput
                                multiline={true}
                                rows={5}
                                onChange={this.onContentChange}
                                value={this.state.content}
                                title="Descreva um pouco mais sobre isso..."
                            />
                        </div>
                    </div>
                    <div className="row content-creator-footer">
                        <button
                            type="submit"
                            className="btn btn-outline-primary">
                            Enviar
                        </button>
                        <Link
                            className="btn btn-outline-primary goback__button"
                            to="/"
                        >
                            Voltar
                    </Link>
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
