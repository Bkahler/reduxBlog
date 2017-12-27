import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component{
  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    return _.map(this.props.posts, function(post){
      return(
        <li key={post.title} className='list-group-item'> {post.title}</li>
      )
    });
  }

  render(){
    return(
      <div>
        <h3> Posts</h3>
        <ul className='list-group'>
          { this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {posts: state.posts}
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);