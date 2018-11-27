import React, { Component } from 'react';

import { connect } from 'react-redux'

import './ContentCreator.css'

import ListGroup from '../list-group/ListGroup'
import TextInput from '../text-input/TextInput'

import { handleGetAllCategoriesAction } from '../../actions/Categories'

class ContentCreator extends Component {

    state = {
        content: '',
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

    render() {

        return (
            <div className="container" id="content-creator">
                <form >
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <ListGroup
                                data={this.props.categories}
                                onChange={this.onChangeCategorySelected}
                            />
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <TextInput
                                multiline={true}
                                rows={5}
                                onChange={this.onContentChange}
                                value={this.state.content}
                                title="O que gostaria de compartilhar hoje?"
                            />
                        </div>
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
