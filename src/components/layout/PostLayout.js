import React, { Component } from 'react';

import { Post } from '../containers';
import { Header } from '../partials';

class PostLayout extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Post {...this.props} />
      </div>
    );
  }
}

export default PostLayout;
