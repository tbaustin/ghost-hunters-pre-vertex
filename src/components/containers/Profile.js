import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import { UpdateProfile } from '../view';

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.users[id] != null) {
      return;
    }

    this.props
      .getProfile(id)
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { id } = this.props.match.params;
    const user = this.props.users[id];
    const bannerUrl = 'https://www.jewelsofjudaism.com/wp-content/uploads/2016/04/glory-universe-banner.jpg';
    const bannerStyle = {
      backgroundImage: `url(${bannerUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };
    const nameStyle = {
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px'
    };
    const imageStyle = {
      width: '125px',
      height: '125px',
      borderRadius: '62.5px',
      margin: '20px auto'
    };
    return (
      <div>
        <h1>Profile Page</h1>
        <div className="jumbotron jumbotron-fluid" style={bannerStyle}>
          <div className="container" style={nameStyle}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Albert_Einstein_1947.jpg/1200px-Albert_Einstein_1947.jpg"
              style={imageStyle}
              className="img-fluid mx-auto"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h1 className="display-3 text-center">Username</h1>
            <p className="lead text-center">FirstName LastName</p>
            <hr className="my-4" />
            <p className="lead" style={{ border: '1px solid #e6e6e6', padding: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae enim eu felis efficitur pretium. Nullam vulputate scelerisque justo,
              ut condimentum augue egestas sit amet. Etiam imperdiet dui vitae diam hendrerit ullamcorper. Proin auctor eget justo sed sodales. Nulla
              et est libero.
            </p>
          </div>
        </div>
        <UpdateProfile />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    users: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getProfile: id => dispatch(actions.getProfile(id))
  };
};

export default connect(stateToProps, dispatchToProps)(Profile);
