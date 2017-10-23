import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { Link } from 'react-router-dom';

import { CreatePost } from '../view';
import { Account } from '../containers';
import actions from '../../actions';
import { DateUtils } from '../../utils';

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
    console.log(posts);
    const { currentUser } = this.props.user;
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <div className="card-columns">
              {posts == null
                ? null
                : posts.map(post => {
                    return (
                      <div key={post.id} className="card text-white bg-dark mb-3" style={{ maxWidth: '20rem' }}>
                        <div className="card-header">
                          <Link to={`/post/${post.id}`}>
                            <img className="card-img-top" src={post.image} alt="Card image cap" />
                          </Link>
                        </div>
                        <div className="card-body text-white">
                          <h4 className="card-title" style={{ color: 'white' }}>{`${post.title.substr(0, 17)}...`}</h4>
                          <p className="card-text">{`${post.text.substr(0, 30)}...`}</p>
                          <span>
                            ~{' '}
                            <Link to={`/profile/${post.profile.id}`} style={{ color: 'white' }}>
                              <strong>{post.profile.username}</strong>
                            </Link>
                          </span>
                        </div>
                        <div className="card-footer">
                          <small className="text-muted">{DateUtils.relativeTime(post.timestamp)}</small>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-12">
                <Account />
              </div>
            </div>
            {currentUser == null ? null : (
              <div className="row" style={{ marginTop: '25px' }}>
                <div className="row">
                  <div className="col-sm-12">
                    <h3>Create a Post</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <CreatePost onCreate={this.createPost.bind(this)} />
                  </div>
                </div>
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
