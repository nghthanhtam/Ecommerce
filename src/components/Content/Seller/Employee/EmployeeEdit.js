import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';
import Loader from 'react-loader';
import axios from 'axios';
import { updateEmployee } from '../../../../state/actions/employeeActions';
import { tokenConfig } from '../../../../state/actions/authActions';

class EmployeeEdit extends Component {
  state = {
    fullname: '',
    idRole: 1,
    identityCard: '',
    phone: '',
    username: '',
    id: '',
  };
  componentDidMount() {
    console.log(this.props.auth);
    const { id } = this.props.match.params;
    const { token } = this.props.auth;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/${id}`,
        // tokenConfig(token)
        this.tokenConfig(this.props.auth.token)
      )
      .then((response) => {
        let {
          fullname,
          idRole,
          identityCard,
          phone,
          username,
          id,
        } = response.data;
        this.setState({ fullname, idRole, identityCard, phone, username, id });
      })
      .catch((er) => console.log(er.response));
  }

  tokenConfig = (token) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    //Header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // if (token) {
    //   config.headers['x-auth-token'] = token;
    // }

    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    const { id, fullname, username, idRole, phone, identityCard } = this.state;
    e.preventDefault();

    const newEmployee = {
      id,
      fullname,
      username,
      idRole,
      phone,
      identityCard,
      idShop: 1,
    };
    this.props.updateEmployee(newEmployee);
    // axios
    //   .put(`/api/category/${id}`, newCategory)

    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
    //Quay về trang chính
    this.props.history.push('/employee');
  };

  handleCancel = (e) => {
    this.props.history.push('/employee');
  };
  render() {
    const { fullname, id, idRole, username, phone } = this.state;

    return (
      <Fragment>
        {!id ? (
          <Loader></Loader>
        ) : (
            <Fragment>
              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Nhân viên
                {/* <small>Preview</small> */}
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                  </li>
                  <li>
                    <a href="fake_url">Nhân viên</a>
                  </li>
                  <li>
                    <a href="fake_url">Sửa</a>
                  </li>
                </ol>
              </section>
              {/* Main content */}
              <section className="content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="box box-info">
                      <div className="box-header with-border">
                        <h3 className="box-title">Horizontal Form</h3>
                      </div>
                      {/* /.box-header */}
                      {/* form start */}
                      <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="box-body">
                          <div className="form-group">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-2 control-label"
                            >
                              ID
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="id"
                                type="text"
                                placeholder="Loading..."
                                className="form-control"
                                value={id}
                                disabled
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="inputPassword3"
                              className="col-sm-2 control-label"
                            >
                              Họ và tên
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="fullname"
                                type="text"
                                className="form-control"
                                placeholder="Loading..."
                                value={fullname}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="username"
                              className="col-sm-2 control-label"
                            >
                              Tên đăng nhập
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder="Loading..."
                                value={username}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="idRole"
                              className="col-sm-2 control-label"
                            >
                              Vai trò
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="idRole"
                                type="text"
                                className="form-control"
                                placeholder="Loading..."
                                value={idRole}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="phone"
                              className="col-sm-2 control-label"
                            >
                              Số điện thoại
                          </label>
                            <div className="col-sm-10">
                              <input
                                name="phone"
                                type="text"
                                className="form-control"
                                placeholder="Loading..."
                                value={phone}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        {/* /.box-body */}
                        <div className="box-footer">
                          <button
                            type="button"
                            onClick={this.handleCancel}
                            className="btn btn-default"
                          >
                            Cancel
                        </button>
                          <button
                            type="submit"
                            className="btn btn-info pull-right"
                          >
                            Save
                        </button>
                        </div>
                        {/* /.box-footer */}
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </Fragment>
          )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  pushHistory,
  updateEmployee,
})(EmployeeEdit);
