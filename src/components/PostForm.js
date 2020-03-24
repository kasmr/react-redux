import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../redux/actions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = e => {
    e.preventDefault();

    const { title } = this.state;

    if (!title) {
      return;
    }

    const newPost = {
      title,
      id: Date.now().toString()
    };

    this.props.createPost(newPost);
    this.setState({ title: '' });
  };

  changeInput = e => {
    e.persist();
    this.setState(prev => ({
      ...prev,
      ...{
        [e.target.name]: e.target.value
      }
    }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className='form-group'>
            <label htmlFor='title'>Заголовок поста</label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={this.state.title || ''}
              onChange={this.changeInput}
            />
          </div>
          <button className='btn btn-success' type='submit'>
            Создать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createPost
};

export default connect(null, mapDispatchToProps)(PostForm);
