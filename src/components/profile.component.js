import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
    console.log(this.state.currentUser)
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.result.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>{currentUser.result.username} you have successfully logged in</strong>
        
        </p>
       
      </div>
    );
  }
}