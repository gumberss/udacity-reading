import React, { Component } from 'react';

import './MainPage.css';

import ContentCreator from '../../components/content-creator/ContentCreator'

import { handleReceivePosts } from '../../actions/Posts'
import { connect } from 'react-redux';

import DynamicShow from '../../components/dynamic-show/DynamicShow';
import PostCard from '../../components/post-card/PostCard'

class MainPage extends Component {



    componentDidMount() {
        const { dispatch } = this.props

        dispatch(handleReceivePosts())
    }

    render() {

        const { postIds } = this.props

        return (
            <div>
                <ContentCreator />


                {postIds.map(postId => (
                    <div key={postId} className="col-md-12">
                        <DynamicShow >
                        <PostCard id={postId} />
                    </DynamicShow>
                    </div>
                ))}

            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        postIds: Object.keys(posts)
    }
}

export default connect(mapStateToProps)(MainPage)