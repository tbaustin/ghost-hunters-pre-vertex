import React, { Component } from 'react';

import { Posts } from '../containers';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Posts />
      </div>
    );
  }
}

export default Home;
