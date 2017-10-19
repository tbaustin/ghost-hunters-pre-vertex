import React, { Component } from 'react';

import { Posts } from '../containers';
import { Header } from '../partials';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Posts />
      </div>
    );
  }
}

export default Home;
