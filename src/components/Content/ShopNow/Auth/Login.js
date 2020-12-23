import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { login } from "../../../../state/actions/authUserActions";
import { pushHistory } from "../../../../state/actions/historyActions";
import { showModal } from "../../../../state/actions/modalActions";
import PropTypes from "prop-types";
import "./Login.css";

const mapStateToProps = (state) => ({
  error: state.error,
  history: state.history,
  isAuthenticated: state.authUser.isAuthenticated,
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    msg: null,
    inputErrors: false,
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    pushHistory: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const currentUrl = window.location.pathname;
    document.body.className =
      currentUrl === "/login" && "hold-transition login-page";
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  validateUsername(username) {
    return new RegExp(/^[a-zA-Z0-9_-]+$/).test(username);
  }

  validatePassword(password) {
    return new RegExp(/^[a-zA-Z0-9]+$/).test(password);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let msg = "";

    //Validation
    const isPassed =
      name === "username"
        ? this.validateUsername(value)
        : this.validatePassword(value);
    const inputErrors = isPassed ? false : true;
    if (name === "username" && !isPassed)
      msg = "Username can contain only letters, numbers and underscores";
    if (name === "password" && !isPassed)
      msg = "Password must contain only letters numbers";

    if (value === "") msg = "";
    this.setState({ [name]: value, msg, inputErrors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = {
      username,
      password,
    };
    this.props.login(user);

    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      //Redirect to homepage
      this.props.pushHistory("/shopnow");
    }
  };

  render() {
    return (
      <div className="modal-wrapper">
        <div
          style={{
            background: "#fff",
            padding: "35px 20px 20px 20px",
            transition: "opacity 0.5s linear",
          }}
          className="login-box"
        >
          <button
            onClick={() => this.props.showModal({ show: false })}
            style={{ float: "right", marginTop: "-10px" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            ×
          </button>
          <div className="login-logo">
            <b>Shop</b>NOW
          </div>
          {/* /.login-logo */}
          <div className="login-box-body">
            <p className="login-box-msg">Sign in to start your session</p>
            {this.state.msg ? (
              <div className="alert alert-danger alert-dismissible">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                {this.state.msg}
              </div>
            ) : null}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group has-feedback">
                <input
                  type="username"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <span className="glyphicon glyphicon-envelope form-control-feedback" />
              </div>
              <div className="form-group has-feedback">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className="glyphicon glyphicon-lock form-control-feedback" />
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-xs-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                    disabled={
                      !this.state.inputErrors &&
                      this.state.password !== "" &&
                      this.state.username !== ""
                        ? false
                        : true
                    }
                  >
                    Sign In
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a
                href="#"
                className="btn btn-block btn-social btn-facebook btn-flat"
              >
                <i className="fa fa-facebook"></i> Sign in using Facebook
              </a>
              <a
                href="#"
                className="btn btn-block btn-social btn-google btn-flat"
              >
                <i className="fa fa-google-plus"></i> Sign in using Google+
              </a>
            </div>
            {/* /.social-auth-links */}
          </div>
          {/* /.login-box-body */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { login, pushHistory, showModal })(
  Login
);
