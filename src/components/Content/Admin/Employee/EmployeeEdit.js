import React, { Fragment, Component } from "react";

import { connect } from "react-redux";
import { pushHistory } from "../../../../actions/historyActions";
import Loader from "react-loader";
import axios from "axios";
import { updateEmployee } from "../../../../actions/employeeActions";

class EmployeeEdit extends Component {
  state = {
    name: "",
    _id: "",
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then((response) => {
        this.setState({ name: response.data.name, _id: response.data._id });
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
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    const { _id, name } = this.state;
    e.preventDefault();

    const newEmployee = {
      name,
      _id,
    };
    this.props.updateEmployee(newEmployee);
    // axios
    //   .put(`/api/category/${_id}`, newCategory)

    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
    //Quay về trang chính
    this.props.history.push("/employee");
  };

  handleCancel = (e) => {
    this.props.history.push("/employee");
  };
  render() {
    const { name, _id } = this.state;

    return (
      <Fragment>
        {!_id ? (
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
                              name="_id"
                              type="text"
                              id="inputEmail3"
                              placeholder="Loading..."
                              className="form-control"
                              value={_id}
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
                            Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              id="inputName"
                              placeholder="Loading..."
                              value={name}
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
