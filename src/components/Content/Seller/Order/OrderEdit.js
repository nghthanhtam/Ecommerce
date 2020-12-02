import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';
import Loader from 'react-loader';
import axios from 'axios';
import OrderRow from './OrderRow'

const mapStateToProps = (state) => ({
  isLoaded: state.order.isLoaded,
  orderDets: state.order.orderDets,
  history: state.history.history,
});

class OrderEdit extends Component {
  state = {
    fullname: '',
    idRole: 1,
    identityCard: '',
    phone: '',
    username: '',
    id: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    //this.props.getOrdeDets(id)

  }
  tokenConfig = (token) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    //Header
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = (e) => {
    this.props.history.push('/home');
  };

  renderSelect = () => {
    const { sort, limit } = this.state;
    return (
      <select
        onChange={this.handleOnChange}
        name="limit"
        aria-controls="example1"
        style={{ margin: '0px 5px' }}
        className="form-control input-sm"
        value={limit}
      >
        {sort.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };

  renderOrders = () => {
    const { orders, isLoaded } = this.props;

    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
        orders.map((eachOrder, index) => (
          <OrderRow
            history={this.props.history}
            key={eachOrder.id}
            order={eachOrder}
            index={index + 1}
          />
        ))
      );
  };

  render() {
    const { fullname, id, idRole, username, phone } = this.state;

    return (
      <Fragment>

        <Fragment>
          <section className="content-header">
            <h1>
              Chi tiết đơn hàng {id}
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="fake_url">
                  <i className="fa fa-dashboard" /> Trang chủ
                </a>
              </li>
              <li>
                <a href="fake_url">Đơn hàng</a>
              </li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              {/* left column */}
              <div className="col-md-12">
                <div className="box">
                  <div className="box-header" style={{ marginTop: '5px' }}>
                    <div style={{ paddingLeft: '5px' }} className="col-md-8">
                      <h3 className="box-title">Quản lý đơn hàng</h3>
                    </div>

                    {/* <div className="col-md-4">
                      <OrderModal limit={limit} page={page} />
                    </div> */}
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div
                      id="example1_wrapper"
                      className="dataTables_wrapper form-inline dt-bootstrap"
                    >
                      <div className="row">
                        <div>
                          {/* <div className="col-sm-6">
                            <div
                              className="dataTables_length"
                              id="example1_length"
                            >
                              <label>
                                Hiển thị
                                {this.renderSelect()}
                                kết quả
                              </label>
                            </div>
                          </div> */}
                          {/* <div className="col-sm-6">
                            <div id="example1_filter" className="dataTables_filter" >
                              <label style={{ float: 'right' }}>
                                Tìm kiếm
                                                <input
                                  type="search"
                                  name="query"
                                  style={{ margin: '0px 5px' }}
                                  className="form-control input-sm"
                                  placeholder="Nhập từ khóa...  "
                                  aria-controls="example1"
                                  onChange={this.handleOnChange}
                                  value={query} />
                              </label>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="example1"
                            className="table table-bordered table-striped"
                          >
                            <thead>
                              <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '5%' }}>Mã đơn hàng</th>
                                <th style={{ width: '15%' }}>Người nhận</th>
                                <th style={{ width: '12%' }}>Số điện thoại</th>
                                <th style={{ width: '15%' }}>Địa chỉ</th>
                                <th style={{ width: '10%' }}>Tổng cộng</th>
                                <th style={{ width: '10%' }}>Ngày đặt</th>
                                <th style={{ width: '10%' }}>Tình trạng</th>
                                <th style={{ width: '15%' }}>Lý do hủy</th>
                              </tr>
                            </thead>

                            <tbody>{this.renderOrders()}</tbody>

                            <tfoot>
                              <tr>
                                <th>#</th>
                                <th>Người nhận  </th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Tổng cộng</th>
                                <th>Ngày đặt</th>
                                <th>Tình trạng</th>
                                <th>Lý do hủy</th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      {/* <div className="row">

                        <div className="col-sm-7">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="example1_paginate">
                            <ul
                              className="pagination"
                              style={{ float: 'right' }}
                            >
                              {this.renderPageButtons()}
                            </ul>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {/*/.col (left) */}
                  </div>
                  {/* /.row */}
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </Fragment>
        {/* )} */}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, { pushHistory })(OrderEdit);
