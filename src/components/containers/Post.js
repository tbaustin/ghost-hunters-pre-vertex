import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import { DateUtils } from '../../utils';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props
      .getRecord(id)
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { id } = this.props.match.params;
    const { url, playing, volume, muted, played, loaded, duration, playbackRate } = this.state;
    const post = this.props.posts[id];
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">{post.title}</h1>
          <div className="row justify-content-center" style={{ marginBottom: '25px' }}>
            <div className="col-4">
              <img src={`${post.image}=s400`} />
            </div>
          </div>
          <p className="lead">{post.text}</p>
          <hr className="my-4" />
          {post.video == undefined ? null : (
            <div className="row justify-content-center">
              <div className="col-8">
                <p className="lead" style={{ marginBottom: '25px' }}>
                  <div class="embed-responsive embed-responsive-16by9">
                    {console.log(post.video)}
                    <video style={{ background: '#e6e6e6' }} width="800" controls loop tabIndex="0">
                      <source src={post.video} type={post.videoType} />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                </p>
              </div>
            </div>
          )}
          <p className="lead">
            <Link to={`/profile/${post.profile.id}`}>
              <button className="btn btn-secondary btn-lg">{post.profile.username}</button>
            </Link>
            <p>{DateUtils.relativeTime(post.timestamp)}</p>
          </p>
        </div>
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
