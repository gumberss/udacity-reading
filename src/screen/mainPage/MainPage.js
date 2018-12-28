import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import CardPost from '../../components/CardPost/CardPost'
import { handleGetAllPosts } from '../../actions/Posts'
import { handleGetAllCategories } from '../../actions/Categories'

import ListGroup from '../../components/list-group/ListGroup'

import { Link } from 'react-router-dom'

import './MainPage.css'

class MainPage extends Component {

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
    const { dispatch, history } = this.props

    dispatch(handleGetAllCategories())
    dispatch(handleGetAllPosts())
  }

  sortCards = (first, second) => {
    const { orderBy } = this.state

    return orderBy === 'ascending'
      ? second.voteScore - first.voteScore
      : first.voteScore - second.voteScore
  }

  onChangeCategorySelected = data => {
    const { history } = this.props
    history.push(data.path)
  }

  render() {
    const { postDatas, match } = this.props
    const { orderBy } = this.state
    const { category }= match.params

    return (
      <div className="container">
        <div className="list-post__container">
          <ListGroup
            data={this.props.categories}
            onChange={this.onChangeCategorySelected}
            style={{
              display: 'flex'
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

            {postDatas
              .filter(post => !category ||post.category === category)
              .sort(this.sortCards).map(postdata => (
              <CardPost
                key={postdata.id}
                postId={postdata.id}
                showDetails
              />
            ))}


          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => ({

  postDatas: Object.keys(posts)
    .filter(id => !posts[id].deleted)
    .map(id => ({
      id: id,
      voteScore: posts[id].voteScore,
      category: posts[id].category
    })),
  categories: Object.values(categories)
})

export default connect(mapStateToProps)(MainPage)