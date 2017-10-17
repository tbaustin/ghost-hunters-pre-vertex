import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { Link } from 'react-router-dom';

import { CreatePost } from '../view';
import { Account } from '../containers';
import actions from '../../actions';

class Posts extends Component {
  componentDidMount() {
    if (this.props.post.all == null) {
      this.props
        .fetchPosts({})
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
    }
  }

  createPost(params) {
    const { currentUser } = this.props.user;
    if (currentUser == null) {
      swal({
        title: 'Oops...',
        text: 'Please Login or Register before posting',
        type: 'error'
      });
      return;
    }

    const updated = Object.assign({}, params, { profile: currentUser });

    this.props
      .createPost(updated)
      .then(data => {
        swal({
          title: 'Post Created',
          text: `Title: ${data.title}`,
          type: 'success'
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const posts = this.props.post.all;

    const { currentUser } = this.props.user;
    return (
      <div>
        <h1>Posts</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="card-deck">
              {posts == null
                ? null
                : posts.map(post => {
                    return (
                      <div className="card text-white bg-dark mb-3">
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </p>
                        </div>
                        <div className="card-footer">
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="col-sm-4">
            <Account />
            {currentUser == null ? null : (
              <div>
                <h3>Create a Post</h3>
                <CreatePost onCreate={this.createPost.bind(this)} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    post: state.post,
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    createPost: params => dispatch(actions.createPost(params)),
    fetchPosts: params => dispatch(actions.fetchPosts(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Posts);
