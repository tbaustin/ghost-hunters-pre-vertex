import React, { Component } from 'react';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
  }

  render() {
    return (
      <div>
        <h1>Post Page</h1>
      </div>
    );
  }
}

export default Post;
