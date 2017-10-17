import React, { Component } from 'react';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import Dropzone from 'react-dropzone';

import { TurboClient } from '../../utils';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: '',
        text: '',
        image:
          'https://lh3.googleusercontent.com/jt6x5sv4Q06g2LB_hnSeEqFWfBt2OvIqNKeNBBJa-lzEvWMNy886eiXVPcjWK-zLIs6m9Tj9VZzjcDUuVVANQaZXhA'
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

  imageUpload(files) {
    let updated = Object.assign({}, this.state.post);
    const file = files[0];

    TurboClient.uploadFile(file)
      .then(data => {
        updated['image'] = data.result.url;
        this.setState({
          post: updated
        });
        swal({
          title: 'Image Uploaded',
          html: `<img src='${data.result.url}=s100' />`,
          type: 'success'
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  videoUpload(files) {
    let updated = Object.assign({}, this.state.post);
    const file = files[0];
  }

  createPost(event) {
    event.preventDefault();
    const { title, text } = this.state.post;
    if (title.length == 0) {
      swal({
        title: 'Oops...',
        text: 'Please include a Title',
        type: 'error'
      });
      return;
    }
    if (text.length == 0) {
      swal({
        title: 'Oops...',
        text: 'Please include some text',
        type: 'error'
      });
      return;
    }
    this.props.onCreate(this.state.post);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={this.updatePost.bind(this, 'title')}
            className="form-control"
            id="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <input
            onChange={this.updatePost.bind(this, 'text')}
            className="form-control"
            id="text"
            type="text"
            placeholder="Text"
          />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Dropzone className="btn btn-success" onDrop={this.imageUpload.bind(this)}>
              Upload Image
            </Dropzone>
          </div>
          <div className="col-sm-6">
            <Dropzone className="btn btn-warning" onDrop={this.videoUpload.bind(this)}>
              Upload Video
            </Dropzone>
          </div>
        </div>
        {this.state.post.image.length == 0 ? null : (
          <div className="row">
            <div className="col-sm-12">
              <img src={`${this.state.post.image}=s150`} style={{ paddingTop: '8px' }} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-sm-6" style={{ paddingTop: '8px' }}>
            <button onClick={this.createPost.bind(this)} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
