import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from 'react-loader';
import { useFormik } from 'formik';
import DateTimePicker from 'react-datetime-picker';
import * as Yup from 'yup';

import './SupplierInfor.css';
import EmployeeRow from '../Employee/EmployeeRow';
import { getEmployees } from '../../../../state/actions/employeeActions';

const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  isLoaded: state.employee.isLoaded,
});

class SupplierInfor extends Component {
  state = {
    sort: [{ value: '5' }, { value: '10' }, { value: '20' }],
    select: '5',
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: '',
  };

  resetState = () => {
    this.setState({ select: '5', currentPage: 1, query: '' });
  };

  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();

    this.getPages();

    this.props.getEmployees({ select, currentPage, query });
  }

  getTotalDocuments = () => {
    const { query } = this.state;

    let newQuery = '';
    if (query === '') newQuery = 'undefined';
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/count/${newQuery}`
      )
      .then((response) => {
        this.setState({ totalDocuments: response.data });
      })
      .catch((er) => {
        console.log(er.response);
      });
  };

  getPages = () => {
    const { select, query } = this.state;

    let newQuery = '';
    if (query === '') newQuery = 'undefined';
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/count/${newQuery}`
      )
      .then((response) => {
        let pages = Math.floor(response.data / select);
        let remainder = response.data % select;
        let newArray = [];
        if (remainder !== 0) pages += 1;

        for (let i = 0; i < pages; i++) {
          newArray.push({ pageNumber: i + 1 });
        }

        this.setState({ pages: newArray });
      })
      .catch((er) => {
        console.log(er.response);
      });
  };

  renderEmployees = () => {
    const { employees } = this.props;
    return employees.map((emp, index) => (
      <EmployeeRow
        history={this.props.history}
        key={emp._id}
        employee={emp}
        index={index}
      />
    ));
  };

  handleOnChange = (e) => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(this.state.query)) {
      return;
    }
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { select, currentPage, query } = this.state;

      this.props.getEmployees({ select, currentPage, query });
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = (e) => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getEmployees({ select, currentPage, query });
    });
  };

  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map((eachButton) => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? 'paginae_button active'
            : 'paginate_button '
        }
      >
        <a
          className="paga-link"
          name="currentPage"
          href="#"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
        >
          {eachButton.pageNumber}
        </a>
      </li>
    ));
  };

  render() {
    const { } = this.state;
    const { isLoaded } = this.props;

    const SignupForm = () => {
      const formik = useFormik({
        initialValues: {
          name: '',
          code: '',
          email: '',
          buscode: '',
          city: '',
          admin: ''
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(50, 'Chỉ được phép nhập ít hơn 50 kí tự')
            .required('Bắt buộc nhập!'),
          code: Yup.string()
            .max(15, 'Chỉ được phép nhập ít hơn 15 kí tự')
            .required('Bắt buộc nhập!'),
          city: Yup.string()
            .max(50, 'Chỉ được phép nhập ít hơn 50 kí tự')
            .required('Bắt buộc nhập!'),
          admin: Yup.string()
            .max(50, 'Chỉ được phép nhập ít hơn 50 kí tự')
            .required('Bắt buộc nhập!'),
          email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Bắt buộc nhập!'),
          buscode: Yup.string()
            .max(20, 'Chỉ được phép nhập ít hơn 20 kí tự')
            .required('Bắt buộc nhập!'),
        }),
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      return (
        <form onSubmit={formik.handleSubmit} style={{ padding: '5px' }}>
          <div className="row-flex">
            <div style={{ width: '100%', padding: '5px' }}>
              <div className="label-text1" htmlFor="name">Tên gian hàng</div>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ borderColor: formik.errors.name && formik.touched.name ? 'red' : '' }}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="errors">{formik.errors.name}</div>
              ) : null}

              <p className="label-text" htmlFor="code">
                Mã gian hàng
              </p>
              <input
                className="form-control"
                id="code"
                name="code"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                style={{ borderColor: formik.errors.code && formik.touched.code ? 'red' : '' }}
              />
              {formik.errors.code && formik.touched.code ? (
                <div className="errors">{formik.errors.code}</div>
              ) : null}

              <p className="label-text" htmlFor="email">
                Email{' '}
              </p>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ borderColor: formik.errors.email && formik.touched.email ? 'red' : '' }}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="errors">{formik.errors.email}</div>
              ) : null}
            </div>
            <div style={{ width: '100%', padding: '3px' }}>
              <p className="label-text1" htmlFor="buscode">Mã đăng ký kinh doanh</p>
              <input
                className="form-control"
                id="buscode"
                name="buscode"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.buscode}
                style={{ borderColor: formik.errors.buscode && formik.touched.buscode ? 'red' : '' }}
              />
              {formik.errors.buscode && formik.touched.buscode ? (
                <div className="errors">{formik.errors.buscode}</div>
              ) : null}

              <p className="label-text" htmlFor="city">
                Tỉnh/Thành phố
              </p>
              <input
                className="form-control"
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                style={{ borderColor: formik.errors.city && formik.touched.city ? 'red' : '' }}
              />
              {formik.errors.city && formik.touched.city ? (
                <div className="errors">{formik.errors.city}</div>
              ) : null}

              <p className="label-text" htmlFor="admin">
                Người phụ trách
              </p>
              <input
                className="form-control"
                id="admin"
                name="admin"
                type="admin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.admin}
                style={{ borderColor: formik.errors.admin && formik.touched.admin ? 'red' : '' }}
              />
              {formik.errors.admin && formik.touched.admin ? (
                <div className="errors">{formik.errors.admin}</div>
              ) : null}
            </div>
          </div>
          <button
            style={{ margin: '20px 0 10px 5px' }}
            className="btn btn-primary"
            type="submit"
          >
            Cập nhật
          </button>
        </form>
      );
    };
    return (
      // <Fragment>
      //   {!isLoaded ? (
      //     <Loader></Loader>
      //   ) : (
      <Fragment>
        <section className="content-header">
          <h1>Thông tin nhà bán</h1>
          <ol className="breadcrumb">
            <li>
              <a href="fake_url">
                <i className="fa fa-dashboard" /> Trang chủ
              </a>
            </li>
            <li>
              <a href="fake_url">Thông tin nhà bán</a>
            </li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <SignupForm />
              </div>
            </div>
          </div>
        </section>

        <section className="content" style={{ marginTop: '-30px' }}>
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#activity" data-toggle="tab">
                  Activity
                </a>
              </li>
              <li>
                <a href="#timeline" data-toggle="tab">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#settings" data-toggle="tab">
                  Settings
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="active tab-pane" id="activity">
                <div class="post">
                  <div class="user-block">
                    <img
                      class="img-circle img-bordered-sm"
                      src="../../dist/img/user1-128x128.jpg"
                      alt="user image"
                    />
                    <span class="username">
                      <a href="#">Jonathan Burke Jr.</a>
                      <a href="#" class="pull-right btn-box-tool">
                        <i class="fa fa-times"></i>
                      </a>
                    </span>
                    <span class="description">
                      Shared publicly - 7:30 PM today
                    </span>
                  </div>
                  <p>
                    Lorem ipsum represents a long-held tradition for designers,
                    typographers and the like. Some people hate it and argue for
                    its demise, but others ignore the hate as they create
                    awesome tools to help create filler text for everyone from
                    bacon lovers to Charlie Sheen fans.
                  </p>
                  <ul class="list-inline">
                    <li>
                      <a href="#" class="link-black text-sm">
                        <i class="fa fa-share margin-r-5"></i> Share
                      </a>
                    </li>
                    <li>
                      <a href="#" class="link-black text-sm">
                        <i class="fa fa-thumbs-o-up margin-r-5"></i> Like
                      </a>
                    </li>
                    <li class="pull-right">
                      <a href="#" class="link-black text-sm">
                        <i class="fa fa-comments-o margin-r-5"></i> Comments (5)
                      </a>
                    </li>
                  </ul>

                  <input
                    class="form-control input-sm"
                    type="text"
                    placeholder="Type a comment"
                  />
                </div>

                <div class="post clearfix">
                  <div class="user-block">
                    <img
                      class="img-circle img-bordered-sm"
                      src="../../dist/img/user7-128x128.jpg"
                      alt="User Image"
                    />
                    <span class="username">
                      <a href="#">Sarah Ross</a>
                      <a href="#" class="pull-right btn-box-tool">
                        <i class="fa fa-times"></i>
                      </a>
                    </span>
                    <span class="description">
                      Sent you a message - 3 days ago
                    </span>
                  </div>
                  <p>
                    Lorem ipsum represents a long-held tradition for designers,
                    typographers and the like. Some people hate it and argue for
                    its demise, but others ignore the hate as they create
                    awesome tools to help create filler text for everyone from
                    bacon lovers to Charlie Sheen fans.
                  </p>

                  <form class="form-horizontal">
                    <div class="form-group margin-bottom-none">
                      <div class="col-sm-9">
                        <input
                          class="form-control input-sm"
                          placeholder="Response"
                        />
                      </div>
                      <div class="col-sm-3">
                        <button
                          type="submit"
                          class="btn btn-danger pull-right btn-block btn-sm"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="post">
                  <div class="user-block">
                    <img
                      class="img-circle img-bordered-sm"
                      src="../../dist/img/user6-128x128.jpg"
                      alt="User Image"
                    />
                    <span class="username">
                      <a href="#">Adam Jones</a>
                      <a href="#" class="pull-right btn-box-tool">
                        <i class="fa fa-times"></i>
                      </a>
                    </span>
                    <span class="description">
                      Posted 5 photos - 5 days ago
                    </span>
                  </div>

                  <input
                    class="form-control input-sm"
                    type="text"
                    placeholder="Type a comment"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
      /* )}
       </Fragment> */
    );
  }
}

SupplierInfor.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getEmployees })(SupplierInfor);
