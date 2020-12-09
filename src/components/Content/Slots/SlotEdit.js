import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../state/actions/historyActions';
import Loader from 'react-loader';
import axios from 'axios';
import { updateEmployee } from '../../../state/actions/employeeActions';

class EmployeeEdit extends Component {
  state = {
    data: {},
    nameObj: { id: 'ID', fullname: 'Họ và tên', username: 'Tên đăng nhập', idRole: 'Vai trò', phone: ' Số điện thoại' }
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    const { getFunction, api, token, nameObj, } = this.props
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/${id}`,
        this.tokenConfig(this.props.auth.token)
      )
      .then((response) => {
        let data = response.data;
        console.log(data);
        this.setState({ data });
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
    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { data } = this.state;
    e.preventDefault();
    const newObj = data;
    this.props.updateEmployee(newObj);
    //Quay về trang chính
    this.props.history.push('/seller/employee');
  };

  handleCancel = (e) => {
    this.props.history.push('/seller/employee');
  };

  render() {
    const { data, nameObj } = this.state;

    return (
      <Fragment>
        {!data.id ? (
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
              <section className="content" style={{ width: '165vw', marginTop: '10px' }}>
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
                        onSubmit={this.handleSubmit} >

                        <div className="box-body">
                          {Object.keys(data).map((item, index) => {
                            return (
                              <Fragment>
                                {nameObj.hasOwnProperty(item) &&
                                  (<div key={index} className="form-group">
                                    <label
                                      htmlFor="inputEmail3"
                                      className="col-sm-2 control-label" >
                                      {nameObj[item]}
                                    </label>
                                    <div className="col-sm-10">
                                      <input
                                        name={item}
                                        type="text"
                                        placeholder="Loading..."
                                        className="form-control"
                                        value={data[item]}
                                        disabled={item == 'id' ? true : false}
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                  </div>)
                                }
                              </Fragment>
                            )
                          })}
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
