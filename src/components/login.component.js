import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    
    if (this.state.username === "") {
        this.setState({
            message: "Enter username",
        })
        return
     }
     if (this.state.password === "") {
        this.setState({
            message: "Enter password",
        })
        return
     }
     
    this.setState({
        message: "",
        loading: true
      });
  
     
      AuthService.login(this.state.username, this.state.password).then(
        (res) => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
                
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
    
          <Form
            onSubmit={this.handleLogin}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
           
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
           
          </Form>
        </div>
      </div>
    );
  }
}