import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import Loader from "react-loader";
import axios from "axios";
import { updateAdmin } from "../../../../state/actions/adminActions";
import { getRoleAdmins } from "../../../../state/actions/roleAdminActions";
import Select from "react-select";

const mapStateToProps = (state) => ({
  roles: state.roleAdmin.roleAdmins,
  isLoaded: state.admin.isLoaded,
});

class AdminEdit extends Component {
  state = {
    fullname: "",
    idRole: "",
    phone: "",
    username: "",
    id: "",
  };

  componentDidMount() {
    console.log(this.props.auth);
    const { id } = this.props.match.params;
    const { token } = this.props.authAdmin;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin/${id}`,
        this.tokenConfig(token)
      )
      .then((response) => {
        let { fullname, idRole, phone, username, id } = response.data;
        this.setState({ fullname, idRole, phone, username, id });
      })
      .catch((er) => console.log(er.response));
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
    const { id, fullname, username, idRole, phone } = this.state;
    e.preventDefault();

    const newAdmin = {
      id,
      fullname,
      username,
      idRole,
      phone,
    };
    this.props.updateAdmin(newAdmin);
    //Quay về trang chính
    this.props.history.push("/admin/admin");
  };

  handleCancel = (e) => {
    this.props.history.push("/admin/admin");
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
  updateAdmin,
  getRoleAdmins,
})(AdminEdit);
