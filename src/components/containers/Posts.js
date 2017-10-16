import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    this.props
      .createPost(params)
      .then(response => alert('Post created'))
      .catch(err => console.log(err));
  }

  render() {
    const posts = this.props.post.all;
    return (
      <div>
        <h1>Posts</h1>
        <div className="row">
          <div className="col-sm-8">
            {posts == null
              ? null
              : posts.map(post => {
                  return (
                    <div
                      key={post.id}
                      className="card"
                      style={{ width: '20rem', margin: '7px 0px' }}
                      className="col-sm-2 col-md-3 col-lg-4"
                    >
                      <img
                        className="card-img-top"
                        src="https://cdn.pixabay.com/photo/2016/01/19/14/25/octagonal-pavilion-1148883__340.jpg"
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                        <p className="card-text">{`${post.text.substr(0, 20)}...`}</p>
                        <a href="#" className="btn btn-info">
                          More
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="col-sm-4">
            {this.props.user.currentUser == null ? (
              <Account />
            ) : (
              <CreatePost onCreate={this.createPost.bind(this)} />
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
