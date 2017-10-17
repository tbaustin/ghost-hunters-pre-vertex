import React, { Component } from 'react';

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
  }

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
      </div>
    );
  }
}

export default Profile;
