import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component{
  renderField(field){
    const { meta: { touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`

    if (field.type == 'text'){
      return(
        <div className={ className }>
          <label> { field.label } </label>
          <input className='form-control' { ...field.input } />
          <div className='text-help'>
            { touched ? error : '' }
          </div>
        </div>
      )
    } else if (field.type == 'text-area') {
      return(
        <div className={ className + ' text-area' } >
          <label> { field.label } </label>
          <textarea className='form-control' { ...field.input } />
          <div className='text-help'>
            { touched ? error : '' }
          </div>
        </div>
      )
    }
  }

  onSubmit(values){
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <Field name='title' label='Title' type='text' component={ this.renderField }/>
        <Field name='category' label='Categories' type='text' component={ this.renderField }/>
        <Field name='contents' label='Post Content' type='text-area' component={ this.renderField }/>
        <button type='submit' className='btn btn-primary'>save</button>
        <Link to='/' className='btn btn-danger'> Cancel </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title){
    errors.title = 'Please enter a title';
  }

  if(!values.categories){
    errors.categories = 'Please enter a comma separated list of categories';
  };

  if(!values.content){
    errors.content = 'Please enter some content for your blog entry';
  };

  return errors
}

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostNew)
);








