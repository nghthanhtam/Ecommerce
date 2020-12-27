import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../../state/actions/authActions";
import { pushHistory } from "../../../state/actions/historyActions";
import { showModal } from "../../../state/actions/modalActions";
import PropTypes from "prop-types";

const mapStateToProps = (state) => ({
  history: state.history,
  employee: state.auth.employee,
  admin: state.authAdmin.admin,
});

class Header extends Component {
  componentDidMount() {
    document.body.className = "hold-transition skin-blue fixed sidebar-mini";
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    pushHistory: PropTypes.func.isRequired,
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.pushHistory("/seller/login");
    this.props.showModal({ show: false });
  };

  render() {
    const { employee, admin, isAdmin } = this.props;
    return (
      <div>
        <header className="main-header">
          {/* Logo */}
          <a href="index2.html" className="logo">
            {/* mini logo for sidebar mini 50x50 pixels */}
            <span className="logo-mini">
              <b>A</b>LT
            </span>
            {/* logo for regular state and mobile devices */}
            <span className="logo-lg">
              {isAdmin ? <b>Admin</b> : <b>Nhà bán</b>}
            </span>
          </a>
          {/* Header Navbar: style can be found in header.less */}
          <nav className="navbar navbar-static-top">
            {/* Sidebar toggle button*/}
            <a
              href="fake_url"
              className="sidebar-toggle"
              data-toggle="push-menu"
              role="button"
            >
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                  <a
                    href="fake_url"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <img
                      src="../img/avatar2.png"
                      className="user-image"
                      alt="User"
                    />
                    <span className="hidden-xs">
                      {isAdmin ? admin.username : employee.username}
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    {/* User image */}
                    <li className="user-header">
                      <img
                        src="../img/avatar2.png"
                        className="img-circle"
                        alt="User"
                      />
                      <p>
                        Alexander Pierce - Web Developer
                        <small>Member since Nov. 2012</small>
                      </p>
                    </li>
                    {/* Menu Body */}
                    <li className="user-body">
                      <div className="row">
                        <div className="col-xs-4 text-center">
                          <a href="fake_url">Followers</a>
                        </div>
                        <div className="col-xs-4 text-center">
                          <a href="fake_url">Sales</a>
                        </div>
                        <div className="col-xs-4 text-center">
                          <a href="fake_url">Friends</a>
                        </div>
                      </div>
                      {/* /.row */}
                    </li>
                    {/* Menu Footer*/}
                    <li className="user-footer">
                      <div className="pull-left">
                        <a href="fake_url" className="btn btn-default btn-flat">
                          Profile
                        </a>
                      </div>
                      <div className="pull-right">
                        <button
                          onClick={this.handleLogout}
                          className="btn btn-default btn-flat"
                        >
                          Sign out
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
                {/* Control Sidebar Toggle Button */}
                <li>
                  <a href="fake_url" data-toggle="control-sidebar">
                    <i className="fa fa-gears" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, { logout, pushHistory, showModal })(
  Header
);
