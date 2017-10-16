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

    if (this.props.user.currentUser == null) {
      this.props
        .currentUser()
        .then(() => {})
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
    console.log(updated);

    this.props
      .createPost(updated)
      .then(data => {
        swal({
          title: 'Post Created',
          text: `Title: ${data.title}`,
          type: 'success'
        });
        console.log(data);
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
            {posts == null
              ? null
              : posts.map(post => {
                  return (
                    <div key={post.id} className="card" style={{ width: '20rem', paddingBottom: '8px' }} className="col-sm-2 col-md-3 col-lg-4">
                      <img
                        className="card-img-top"
                        src="https://cdn.pixabay.com/photo/2016/01/19/14/25/octagonal-pavilion-1148883__340.jpg"
                        alt="Card image cap"
                      />
                      <div
                        className="card-body"
                        style={{
                          background: '#f3f3f3',
                          padding: '8px',
                          borderRadius: '0px 0px 8px 8px'
                        }}
                      >
                        <h4 className="card-title">{post.title.substr(0, 15)}...</h4>
                        <span>
                          Created by: <strong>{post.user.username}</strong>
                        </span>
                        <p className="card-text">{`${post.text.substr(0, 20)}...`}</p>
                        <Link to={`/post/${post.id}`} className="btn btn-info">
                          More
                        </Link>
                      </div>
                    </div>
                  );
                })}
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
    fetchPosts: params => dispatch(actions.fetchPosts(params)),
    currentUser: () => dispatch(actions.currentUser())
  };
};

export default connect(stateToProps, dispatchToProps)(Posts);
