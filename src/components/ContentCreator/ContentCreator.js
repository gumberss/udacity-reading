import React, { Component } from 'react';
import { connect } from 'react-redux'
import './ContentCreator.css'
import newId from 'uuid/v1'

import ListGroup from '../list-group/ListGroup'
import TextInput from '../TextInput/TextInput'
import { Link } from 'react-router-dom'
import { handleNewPost, handleEditPost } from '../../actions/Posts'

class ContentCreator extends Component {

    state = {
        content: '',
        title: '',
        category: {},
        showError: false
    }

    onContentChange = e => {

        this.setState({
            content: e.target.value,
            showError: false
        })
    }

    onChangeCategorySelected = category => {

        this.setState({
            category: category
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { isEdit } = this.props
        const { title, content } = this.state

        if (!title || !content) {
            this.setState({
                showError: true
            })

            return;
        }

        isEdit ? this.editPost() : this.addNewPost()
    }

    onTitleChange = e => {
        this.setState({
            title: e.target.value,
            showError: false
        })
    }

    editPost = () => {
        const { title, content } = this.state
        const { dispatch, post, goBack } = this.props

        dispatch(handleEditPost(post.id, title, content, goBack))
    }

    addNewPost = () => {
        const { title, content, category } = this.state
        const { dispatch } = this.props

        const nextAction = () =>
            this.setState({
                content: '',
                title: ''
            })

        const post = {
            id: newId(),
            timestamp: Date.now(),
            title: title,
            body: content,
            author: 'studant',
            category: category.name
        }

        dispatch(handleNewPost(post, nextAction))
    }

    componentDidMount() {
        const { isEdit, categories, post } = this.props

        if (isEdit) {
            this.setState({
                content: post.body,
                title: post.title,
                category: categories.find(x => x.name === post.category)
            })
        }
    }

    render() {
        const { initialCategory, isEdit } = this.props
        const { showError } = this.state

        return (
            <div id="content-creator">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 content-creator-item">
                            <ListGroup
                                data={this.props.categories.filter(x => x.name !== 'todos')}
                                onChange={this.onChangeCategorySelected}
                                title="Selecione a categoria"
                                initial={initialCategory}
                                disableChange={isEdit}
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
                            {isEdit && 'Editar' || 'Enviar'}
                        </button>
                        <Link
                            className="btn btn-outline-primary goback__button"
                            to="/"
                        >
                            Voltar
                        </Link>
                        { showError && (<p className="error-message">Por favor, preencha todos os campos</p>) }
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, posts }, { postId }) => {

    var post = posts[postId]

    return {
        categories: Object.values(categories),
        post: post,
        initialCategory: post && Object.values(categories).find(x => x.name === post.category) || categories[0],
        isEdit: !!post
    }
}

export default connect(mapStateToProps)(ContentCreator)
