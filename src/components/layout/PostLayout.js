import React, { Component } from 'react';

import { Post } from '../containers';

class PostLayout extends Component {
  render() {
    return (
      <div>
        <Post {...this.props} />
      </div>
    );
  }
}

export default PostLayout;
