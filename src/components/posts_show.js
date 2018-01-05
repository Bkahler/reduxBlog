import React, { Component } from 'react';
import { connect} from 'react-redux';
import { fetchPost } from '../actions';
import { deletePost } from '../actions';
import { Link } from 'react-router-dom';




class PostShow extends Component {
  //lifecycle method
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const { id } = this.props.match.params;
    this.props.deletePost(id, ()=> {
      this.props.history.push('/');
    });
  };

  render(){
    const { post } = this.props;

    if(!post){
      return(<div> Loading...</div>)
    }

    return(
      <div>
        <Link to='/' className='btn btn-primary btn-sm'> back to index </Link>

        <button className='btn btn-danger btn-sm pull-xs-right' onClick={ this.onDeleteClick.bind(this) }>
          delete post
        </button>

        <h3> { post.title } </h3>
        <h6> Categories: { post.category } </h6>
        <p> { post.contents } </p>
      </div>
    )
  }
}

//own props is the props object that is going to the componenet above
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);

