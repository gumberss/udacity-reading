import React, { Component, Fragment } from 'react';
import CardPost from '../CardPost/CardPost'
import { connect } from 'react-redux'

import { handleGetAllPosts } from '../../actions/Posts'
import { handleGetAllCategories } from '../../actions/Categories'

import ListGroup from '../list-group/ListGroup'

import { Link } from 'react-router-dom'

import './ListPosts.css'

class ListPosts extends Component {

    state = {
        orderBy: 'ascending'
    }

    changeOrder = e => {

        const { orderBy } = this.state

        this.setState({
            orderBy: orderBy === 'ascending' ? 'descending' : 'ascending'
        })
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(handleGetAllCategories())
        dispatch(handleGetAllPosts())
    }

    sortCards = (first, second) => {
        const { orderBy } = this.state

        return orderBy === 'ascending'
            ? second.voteScore - first.voteScore
            : first.voteScore - second.voteScore
    }

    render() {

        const { postDatas } = this.props
        const { orderBy } = this.state

        return (
            <div className="list-post__container">
                <ListGroup
                    data={this.props.categories}
                    onChange={this.onChangeCategorySelected}
                    style={{
                        display:'flex'
                    }}
                />

                <div className="header">
                    <button
                        className="btn btn-outline-primary btn-order"
                        onClick={this.changeOrder}
                    >
                        {orderBy === 'ascending' && 'Ordenar da menor pontuação para a maior'}
                        {orderBy === 'descending' && 'Ordenar da maior pontuação para a menor'}
                    </button>

                    <Link
                        className="btn btn-outline-primary btn-order"
                        to="/new"
                    >
                    Adicionar novo post
                    </Link>
                </div>
                <div className="row">

                    {postDatas.sort(this.sortCards).map(postdata => (
                        <CardPost
                            key={postdata.id}
                            postId={postdata.id}
                            showDetails
                        />
                    ))}


                </div>
            </div>);
    }
}

const mapStateToProps = ({ posts,categories }) => ({

    postDatas: Object.keys(posts).map(id => ({
        id: id,
        voteScore: posts[id].voteScore
    })),
    categories: Object.values(categories)
})

export default connect(mapStateToProps)(ListPosts)