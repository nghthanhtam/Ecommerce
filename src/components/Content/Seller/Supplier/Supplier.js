import React, { Component, Fragment } from "react";
import SupplierModal from "./SupplierModal";
import SupplierRow from "./SupplierRow";
import { connect } from "react-redux";
import { getSuppliers } from "../../../../actions/supplierActions";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "react-loader";

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
  isLoaded: state.supplier.isLoaded,
});

class Supplier extends Component {
  state = {
    sort: [{ value: "5" }, { value: "10" }, { value: "20" }],
    select: "5",
    currentPage: 1,
    pages: [],
    totalDocuments: 0,
    query: "",
  };

  resetState = () => {
    this.setState({ select: "5", currentPage: 1, query: "" });
  };

  componentDidMount() {
    const { select, currentPage, query } = this.state;
    this.getTotalDocuments();

    this.getPages();

    this.props.getSuppliers(select, currentPage, query);
  }

  getTotalDocuments = () => {
    const { query } = this.state;

    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/count/${newQuery}`
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

    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/count/${newQuery}`
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

  renderSuppliers = () => {
    const { suppliers } = this.props;
    return suppliers.map((eachSup, index) => (
      <SupplierRow
        history={this.props.history}
        key={eachSup._id}
        supplier={eachSup}
        index={index}
        // deleteCategory={this.props.deleteCategory}
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

      this.props.getSuppliers(select, currentPage, query);
      this.getPages();
      this.getTotalDocuments();
    });
  };

  handleChoosePage = (e) => {
    this.setState({ currentPage: e }, () => {
      const { select, currentPage, query } = this.state;
      this.props.getSuppliers(select, currentPage, query);
    });
  };

  renderPageButtons = () => {
    const { pages, currentPage } = this.state;

    return pages.map((eachButton) => (
      <li
        key={eachButton.pageNumber}
        className={
          currentPage === eachButton.pageNumber
            ? "paginae_button active"
            : "paginate_button "
        }
      >
        <div
          name="currentPage"
          onClick={() => this.handleChoosePage(eachButton.pageNumber)}
          aria-controls="example1"
          data-dt-idx={eachButton.pageNumber}
          tabIndex={0}
        >
          {eachButton.pageNumber}
        </div>
      </li>
    ));
  };

  render() {
    const { select, totalDocuments } = this.state;
    const { isLoaded } = this.props;

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            <section class="content-header">
              <h1>User Profile</h1>
              <ol class="breadcrumb">
                <li>
                  <a href="#">
                    <i class="fa fa-dashboard"></i> Home
                  </a>
                </li>
                <li>
                  <a href="#">Examples</a>
                </li>
                <li class="active">User profile</li>
              </ol>
            </section>

            <section class="content">
              <div class="row">
                <div class="col-md-3">
                  <div class="box box-primary">
                    <div class="box-body box-profile">
                      <img
                        class="profile-user-img img-responsive img-circle"
                        src="../../dist/img/user4-128x128.jpg"
                        alt="User profile picture"
                      />

                      <h3 class="profile-username text-center">
                        Thế giới đồ chơi
                      </h3>

                      <p class="text-muted text-center">Software Engineer</p>

                      <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">
                          <b>Đơn hàng</b> <a class="pull-right">320</a>
                        </li>
                        <li class="list-group-item">
                          <b>Nhân viên</b> <a class="pull-right">5</a>
                        </li>
                      </ul>

                      <a href="#" class="btn btn-primary btn-block">
                        <b>Follow</b>
                      </a>
                    </div>
                  </div>

                  <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">About Me</h3>
                    </div>

                    <div class="box-body">
                      <strong>
                        <i class="fa fa-book margin-r-5"></i> Education
                      </strong>

                      <p class="text-muted">
                        B.S. in Computer Science from the University of
                        Tennessee at Knoxville
                      </p>

                      <hr />

                      <strong>
                        <i class="fa fa-map-marker margin-r-5"></i> Location
                      </strong>

                      <p class="text-muted">Malibu, California</p>

                      <hr />

                      <strong>
                        <i class="fa fa-pencil margin-r-5"></i> Skills
                      </strong>

                      <p>
                        <span class="label label-danger">UI Design</span>
                        <span class="label label-success">Coding</span>
                        <span class="label label-info">Javascript</span>
                        <span class="label label-warning">PHP</span>
                        <span class="label label-primary">Node.js</span>
                      </p>

                      <hr />

                      <strong>
                        <i class="fa fa-file-text-o margin-r-5"></i> Notes
                      </strong>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam fermentum enim neque.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-md-9">
                  <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                      <li class="active">
                        <a href="#activity" data-toggle="tab">
                          Thông tin tài khoản
                        </a>
                      </li>
                      <li>
                        <a href="#timeline" data-toggle="tab">
                          Thông tin ngân hàng
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
                        <form class="form-horizontal">
                          <div class="form-group">
                            <label
                              for="inputName"
                              class="col-sm-2 control-label"
                            >
                              Mã gian hàng
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputName"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputEmail"
                              class="col-sm-2 control-label"
                            >
                              Tên gian hàng
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputName"
                              class="col-sm-2 control-label"
                            >
                              Hợp đồng số
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputName"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputSkills"
                              class="col-sm-2 control-label"
                            >
                              Mã số thuế
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputSkills"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputSkills"
                              class="col-sm-2 control-label"
                            >
                              Người phụ trách
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputSkills"
                              />
                            </div>
                          </div>

                          <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                              <button type="submit" class="btn btn-danger">
                                Lưu
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div class="tab-pane" id="timeline">
                        <p style={{ color: "grey" }}>
                          Lưu ý đối với tài khoản ngân hàng
                          <br />
                          Trường hợp Công Ty: Tên chủ tài khoản ngân hàng trùng
                          khớp với tên Công ty trên giấy phép kinh doanh
                          <br />
                          Trường hợp Hộ Kinh Doanh: Tên tài khoản ngân hàng là
                          tên chủ hộ kinh doanh trên giấy phép kinh doanh
                        </p>
                      </div>

                      <div class="tab-pane" id="settings">
                        <form class="form-horizontal">
                          <div class="form-group">
                            <label
                              for="inputName"
                              class="col-sm-2 control-label"
                            >
                              Mã gian hàng
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputName"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputEmail"
                              class="col-sm-2 control-label"
                            >
                              Tên gian hàng
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputName"
                              class="col-sm-2 control-label"
                            >
                              Hợp đồng số
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputName"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputExperience"
                              class="col-sm-2 control-label"
                            >
                              Mã số thuế
                            </label>

                            <div class="col-sm-10">
                              <textarea
                                class="form-control"
                                id="inputExperience"
                              ></textarea>
                            </div>
                          </div>
                          <div class="form-group">
                            <label
                              for="inputSkills"
                              class="col-sm-2 control-label"
                            >
                              Người phụ trách
                            </label>

                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>

                          <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                              <button type="submit" class="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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

Supplier.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  supplier: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getSuppliers })(Supplier);
