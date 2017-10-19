import React, { Component } from 'react';

import { Profile } from '../containers';
import { Header } from '../partials';

class ProfileLayout extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Profile {...this.props} />
      </div>
    );
  }
}

export default ProfileLayout;
