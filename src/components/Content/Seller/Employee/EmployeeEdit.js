import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import Loader from "react-loader";
import axios from "axios";
import { updateEmployee } from "../../../../state/actions/employeeActions";
import { getRoles } from "../../../../state/actions/roleActions";
import Select from "react-select";

const mapStateToProps = (state, props) => {
  return {
    history: state.history.history,
    auth: state.auth,
    idShop: state.auth.role.idShop,
    roles: state.role.roles,
    isLoaded: state.role.isLoaded,
    isUpdated: state.employee.isUpdated,
  };
};

class EmployeeEdit extends Component {
  state = {
    fullname: "",
    idRole: "",
    identityCard: "",
    phone: "",
    username: "",
    id: "",
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { token } = this.props.auth;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/${id}`,
        this.tokenConfig(token)
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

    this.props.getRoles({
      limit: 1000,
      page: 1,
      query: "",
      idShop: this.props.idShop,
    });
  }

  tokenConfig = (token) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //Header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { id, fullname, username, idRole, phone, identityCard } = this.state;
    const { idShop } = this.props;
    e.preventDefault();

    const newEmployee = {
      id,
      fullname,
      username,
      idRole,
      phone,
      identityCard,
      idShop,
    };
    this.props.updateEmployee(newEmployee);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isUpdated } = this.props;
    if (isUpdated && isUpdated !== prevProps.isUpdated) {
      //quay ve danh sach nhan vien
      this.props.history.push("/seller/employee");
    }
  }
  handleCancel = (e) => {
    this.props.history.push("/seller/employee");
  };

  handleChangeSelect = (selectedItem) => {
    this.setState({ idRole: selectedItem.id });
  };

  render() {
    const { fullname, id, idRole, username, phone } = this.state;
    const { isLoaded, roles } = this.props;

    return (
      <Fragment>
        {!id && !isLoaded ? (
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
            <section
              className="content"
              style={{ width: "165vw", marginTop: "10px" }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Quản lý nhân viên</h3>
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
                            <Select
                              name="idRole"
                              onChange={this.handleChangeSelect}
                              isSearchable={true}
                              options={roles}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.id}
                              placeholder="Chọn quyền truy cập cho nhân viên này"
                              value={roles.filter(
                                (option) => option.id === idRole
                              )}
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

export default connect(mapStateToProps, {
  pushHistory,
  updateEmployee,
  getRoles,
})(EmployeeEdit);
