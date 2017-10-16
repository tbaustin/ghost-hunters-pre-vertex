import React, { Component } from 'react';

import { CreateAccount } from '../view';

class Account extends Component {
  register(account) {
    console.log(account);
  }

  login(account) {
    console.log(account);
  }

  render() {
    return (
      <div>
        <h1>Account Page</h1>
        <CreateAccount onRegister={this.register.bind(this)} onLogin={this.login.bind(this)} />
      </div>
    );
  }
}

export default Account;
