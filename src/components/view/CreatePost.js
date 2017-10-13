import React, { Component } from 'react';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: '',
        text: ''
      }
    };
  }

  updatePost(attr, event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.post);
    updated[attr] = event.target.value;

    this.setState({
      post: updated
    });
  }

  createPost(event) {
    event.preventDefault();
    this.props.onCreate(this.state.post);
  }

  render() {
    return (
      <div>
        <h2>Create Post</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input onChange={this.updatePost.bind(this, 'title')} className="form-control" id="title" type="text" placeholder="Title" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <input onChange={this.updatePost.bind(this, 'text')} className="form-control" id="text" type="text" placeholder="Text" />
        </div>
        <button onClick={this.createPost.bind(this)} className="btn btn-primary">
          Submit
        </button>
      </div>
    );
  }
}

export default CreatePost;
