import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';

import { CreateReply } from '../view';
import actions from '../../actions';

class Reply extends Component {
  componentDidMount() {
    if (this.props.reply[this.props.postId] != null) {
      return;
    }
    this.props
      .getReplies({ postId: this.props.postId })
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  createReply(params) {
    const { currentUser } = this.props.user;
    if (currentUser == null) {
      swal({
        title: 'Oops...',
        text: 'Please Login or Register',
        type: 'error'
      });
      return;
    }

    params['user'] = {
      username: currentUser.username,
      id: currentUser.id
    };
    params['postId'] = this.props.postId;

    this.props
      .createReply(params)
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const replies = this.props.reply[this.props.postId];
    console.log(typeof replies);
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <ul className="list-group">
              {replies == null
                ? null
                : replies.map(reply => {
                    <li key={reply.id} className="list-group-item list-group-item-secondary">
                      {reply.text}
                      <br />
                      {reply.user.username}
                    </li>;
                  })}
            </ul>
          </div>
        </div>
        <CreateReply onCreate={this.createReply.bind(this)} />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    reply: state.reply
  };
};

const dispatchToProps = dispatch => {
  return {
    createReply: params => dispatch(actions.createReply(params)),
    getReplies: params => dispatch(actions.getReplies(params))
  };
};

export default connect(stateToProps, dispatchToProps)(Reply);
