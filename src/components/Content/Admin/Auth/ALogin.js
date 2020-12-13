import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../../state/actions/authAdminActions';
import { pushHistory } from '../../../../state/actions/historyActions';
import PropTypes from 'prop-types';
import styles from './alogin.module.css'

const mapStateToProps = (state) => ({
  error: state.error,
  history: state.history,
  isAuthenticated: state.auth.isAuthenticated,
});

class ALogin extends Component {
  state = {
    username: '',
    password: '',
    msg: null,
    inputErrors: false,
  };

  componentDidMount() {
    const currentUrl = window.location.pathname;
    document.body.className = currentUrl === '/login' && 'hold-transition login-page';
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'ADMIN_LOGIN_FAIL') {
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
    let msg = '';

    //Validation
    const isPassed =
      name === 'username'
        ? this.validateUsername(value)
        : this.validatePassword(value);
    const inputErrors = isPassed ? false : true;
    if (name === 'username' && !isPassed)
      msg = 'Username can contain only letters, numbers and underscores';
    if (name === 'password' && !isPassed)
      msg = 'Password must contain only letters numbers';

    if (value === '') msg = '';
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
  };

  render() {
    return (
      <Fragment>
        <div className={styles.aloginwrapper}> </div>
        <div className={styles.loginbox}>
          <div className="login-logo">
            <a href="/login" style={{ color: 'white' }}>
              <b>Admin</b>Login
            </a>
          </div>
          {/* /.login-logo */}
          {/* <div className="login-box-body"> */}
          <p className="login-box-msg">Đăng nhập và bắt đầu quản lý</p>
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
            </div>
            <div className="row">
              {/* /.col */}
              <div className="col-xs-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                  disabled={
                    !this.state.inputErrors &&
                      this.state.password !== '' &&
                      this.state.username !== ''
                      ? false
                      : true
                  }
                >
                  Đăng nhập
              </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          {/* /.social-auth-links */}
          {/* </div> */}
          {/* /.login-box-body */}
        </div>
      </Fragment>

    );
  }
}

ALogin.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  pushHistory: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { login, pushHistory })(ALogin);
