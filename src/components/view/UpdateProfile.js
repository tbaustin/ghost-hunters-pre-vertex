import React, { Component } from 'react';

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      editShow: false
    };
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center" style={{ marginBottom: '100px' }}>
          <div className="col-sm-6">
            <a href="#update_user">
              <button
                className="btn btn-warning btn-lg btn-block"
                onClick={() => {
                  this.setState({ editShow: !this.state.editShow });
                }}
              >
                Edit Profile
              </button>
            </a>
          </div>
        </div>
        {this.state.editShow == false ? null : (
          <div className="row">
            <div id="update_user">
              <h1>Here we will edit the user profile</h1>
              <button className="btn btn-success">Update</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UpdateProfile;
