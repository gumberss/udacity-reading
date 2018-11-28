import React, { Component } from 'react';
import { connect } from 'react-redux'

import './ContentCreator.css'

import newId from 'uuid/v1'

import ListGroup from '../list-group/ListGroup'
import TextInput from '../text-input/TextInput'
import Button from '../button/Button'

import { handleGetAllCategoriesAction } from '../../actions/Categories'

class ContentCreator extends Component {

    state = {
        content: '',
        title: '',
        category: {}
    }

    componentDidMount() {

        const { dispatch } = this.props

        dispatch(handleGetAllCategoriesAction())
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

    onTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    render() {

        return (
            <div className="container" id="content-creator">
                <form >
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <ListGroup
                                data={this.props.categories}
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
                    <div className="row">
                        <Button text="Enviar" type="submit"/>
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
