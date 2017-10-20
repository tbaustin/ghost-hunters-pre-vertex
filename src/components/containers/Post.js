import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import { DateUtils } from '../../utils';
import { Reply } from '../containers';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.posts[id] != null) {
      return;
    }
    this.props
      .getRecord(id)
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { id } = this.props.match.params;
    const post = this.props.posts[id];
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">{post.title}</h1>
          <div className="row" style={{ marginBottom: '25px' }}>
            <img className="img-fluid mx-auto" src={`${post.image}`} style={{ maxHeight: '400px' }} />
          </div>
          <p className="lead">{post.text}</p>
          <hr className="my-4" />
          {post.video == undefined ? null : (
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="lead" style={{ marginBottom: '25px' }}>
                  <div className="embed-responsive embed-responsive-16by9">
                    <video style={{ background: 'black' }} width="800" controls loop tabIndex="0">
                      <source src={post.video} type={post.videoType} />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="lead">
            <Link to={`/profile/${post.profile.id}`}>
              <button className="btn btn-secondary btn-lg">{post.profile.username}</button>
            </Link>
            <p style={{ marginTop: '10px' }}>{DateUtils.relativeTime(post.timestamp)}</p>
          </div>
        </div>
        <Reply postId={post.id} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    posts: state.post
  };
};

const dispatchToProps = dispatch => {
  return {
    getRecord: id => dispatch(actions.getRecord(id))
  };
};

export default connect(stateToProps, dispatchToProps)(Post);
