import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import ProductRow from './ProductRow';
//import ProductModal from ".ProductModal";
import { getProducts } from '../../../../state/actions/productActions';
import { showNoti } from '../../../../state/actions/notificationActions';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Loader from 'react-loader';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  products: state.product.products,
  isLoaded: state.product.isLoaded,
  totalDocuments: state.product.totalDocuments,
});

class Product extends Component {
  state = {
    sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
    limit: 5,
    page: 1,
    query: '',
    pages: [],
    query: '',
    start: 1,
    end: 5,
    isNextBtnShow: false,
    propValueList: [],
    isPriceBoardHidden: true,
    skuproduct: {
      index: 0,
      id: 0,
      productId: '',
      name: '',
      sku: '',
      marketPrice: 0,
      price: 0,
      qty: 0,
      qtyAdd: 0,
      status: 1
    },
    productList: [
      {
        index: 0,
        id: 0,
        idProduct: '',
        idShop: '',
        SKU: '',
        marketPrice: 0,
        name: '',
        price: 0,
        qty: 0,
        qtyAdd: 0,
        status: 1
      },
    ],
  };

  resetState = () => {
    this.setState({ limit: 5, page: 1, query: '' });
  };

  componentDidMount() {
    const { limit, page, query } = this.state;
    this.props.getProducts({
      limit,
      page,
      query,
    });
    // if (!this.props.location.state) return;
    // else this.setState({ notiType: this.props.location.state.notiType });
  }

  //set lai end khi danh sach chi co 1 trang, va so luong sp khong du limit cua trang do
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const { totalDocuments } = this.props, { end } = this.state
    if (totalDocuments < 5 && end !== totalDocuments) {
      this.setState({ end: totalDocuments })
    }
  }

  renderProducts = (isPending) => {
    const { products, isLoaded } = this.props;
    const { start } = this.state;
    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
        products.map((eachProduct, index) => (
          <ProductRow
            history={this.props.history}
            key={eachProduct.id}
            product={eachProduct}
            index={index + start - 1}
            isPending={isPending}
          />
        ))
      );
  };

  getPages = () => {
    const { limit, query } = this.state;
    const { totalDocuments } = this.props;
    if (totalDocuments == 0) return;

    let newQuery = '';
    if (query === '') newQuery = 'undefined';
    else newQuery = query;

    let pages = Math.floor(totalDocuments / limit);
    let remainder = totalDocuments % limit;
    let newArray = [];
    if (remainder !== 0) pages += 1;

    for (let i = 0; i < pages; i++) {
      newArray.push({ pageNumber: i + 1 });
    }

    //Nếu totalDocuments > 6 thì pageButtons được chia ra làm 3 nút số đầu - dấu 3 chấm - nút số cuối
    if (newArray && newArray.length > 6) {
      newArray = [
        { pageNumber: 1 },
        { pageNumber: 2 },
        { pageNumber: 3 },
        { pageNumber: '...' },
        { pageNumber: newArray.length },
      ];
    }
    this.setState({ pages: newArray });
  };

  handleOnChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (e.target.name === 'query') {
        this.setState({ page: 1 }, () => {
          this.rerenderPage();
        });
      } else {
        this.rerenderPage();
      }
    });
  };

  getStartEndDocuments() {
    const { limit, page } = this.state;
    const { totalDocuments } = this.props;

    let pages = Math.floor(totalDocuments / limit),
      remainder = totalDocuments % limit;
    if (remainder !== 0) pages += 1;
    console.log(totalDocuments);

    this.setState({ start: (page - 1) * limit + 1 }, () => {
      let end;
      if (Math.floor(totalDocuments / limit) + 1 == page)
        end = (page - 1) * limit + (totalDocuments % limit);
      else end = page * limit;
      this.setState({ end: end });
    });
  }

  rerenderPage = () => {
    const { limit, page, query } = this.state;
    this.props.getProducts({
      limit,
      page,
      query
    });
    this.getPages();
    this.getStartEndDocuments();
  };

  handleChoosePage = (e) => {
    const { totalDocuments } = this.props;
    const { limit, page } = this.state;
    let pages = Math.floor(totalDocuments / limit),
      remainder = totalDocuments % limit;
    if (remainder !== 0) pages += 1;
    if (e === -1) {
      e = page + 1;
      if (page === pages) {
        this.setState({ isNextBtnShow: false });
      }
    } else this.setState({ isNextBtnShow: true });

    this.setState({ page: e }, () => {
      const { limit, page, query } = this.state;
      this.props.getProducts({
        limit,
        page,
        query
      });
      this.getStartEndDocuments();
    });
  };

  renderPageButtons = () => {
    const { pages, page, isNextBtnShow } = this.state;

    if (pages.length > 1) {
      return (
        <>
          {pages.map((eachButton) => (
            <li
              key={eachButton.pageNumber}
              className={
                page === eachButton.pageNumber
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
          ))}
          <li className="paginate_button">
            <a
              className={
                isNextBtnShow === true ? 'paga-link' : 'paga-link_hidden'
              }
              name="currentPage"
              href="#"
              onClick={() => this.handleChoosePage(-1)}
            >
              {'>>'}
            </a>
          </li>
        </>
      );
    }
  };

  addRow = () => {
    let { skuproduct, productList } = this.state, obj = {};
    obj = Object.assign(skuproduct);
    obj.index = Math.max.apply(Math, productList.map(function (element) { return element.index })) + 1
    this.setState((prepState) => ({
      //add obj to warehouse product list
      productList: [...prepState.productList, obj],
    }));
  };

  onChange = (e, index) => {
    this.setState((prepState) => {
      let productList = [...prepState.productList];
      let { id, idProduct, idShop, SKU, marketPrice, name, price, qty, qtyAdd, status } = e

      const newItem = {
        id,
        index,
        idProduct,
        idShop,
        SKU,
        marketPrice,
        name,
        price,
        qty: 0,
        qtyAdd: 0,
        status
      };
      productList.map((pd) => {
        if (pd.index === index) {
          productList.splice(index, 1); //xoa 1 phan tu o vi tri index
          productList.splice(index, 0, newItem); //chen newItem vao vi tri thu index
        }
      });

      return {
        productList,
      };
    });
  };

  onAddingQty = (e, index) => {
    const { productList } = this.state
    productList.map((pd) => {
      if (pd.index === index) {
        pd.qtyAdd = Number(e.target.textContent);
      }
    });
    console.log(this.state.productList);
  }

  onSubmit = () => {

  }

  createNotification = () => {
    this.props.showNoti(this.state.notiType);
    this.setState({ notiType: '' });
  };

  render() {
    const { isLoaded, products, totalDocuments } = this.props;
    const { start, end, query, notiType, propValueList, productList, } = this.state;

    return (
      <Fragment>
        {!isLoaded ? (
          <Loader></Loader>
        ) : (
            <React.Fragment>
              {/* {notiType !== '' ? this.createNotification() : null}
            <NotificationContainer /> */}

              {/* Content Header (Page header) */}
              <section className="content-header">
                <h1>
                  Sản phẩm
                </h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="fake_url">
                      <i className="fa fa-dashboard" /> Trang chủ
                  </a>
                  </li>
                  <li>
                    <a href="fake_url">Danh sách s
                    ản phẩm</a>
                  </li>
                </ol>
              </section>
              {/* Main content */}
              <section className="content" >
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#list" data-toggle="tab">
                        Dánh sách sản phẩm
                    </a>
                    </li>
                    <li>
                      <a href="#pendinglist" data-toggle="tab">
                        Chờ duyệt
                      </a>
                    </li>
                    <li>
                      <a href="#warehouse" data-toggle="tab">
                        Nhập kho
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="active tab-pane" id="list">
                      <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                          <div className="box1">
                            {/* <div className="col-md-4">
                        <ProductModal />
                      </div> */}

                            {/* /.box-header */}
                            <div className="box-body">
                              <div
                                id="example1_wrapper"
                                className="dataTables_wrapper form-inline dt-bootstrap"
                              >
                                <div className="row">
                                  <div>
                                    <div className="col-sm-6">
                                      <div
                                        className="dataTables_length"
                                        id="example1_length"
                                      >
                                        <label>
                                          Hiển thị
                                          <select
                                            onChange={this.handleOnChange}
                                            name="limit"
                                            aria-controls="example1"
                                            style={{ margin: '0px 5px' }}
                                            className="form-control input-sm"
                                            value={this.state.limit}
                                          >
                                            {this.state.sort.map((option) => (
                                              <option
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.value}
                                              </option>
                                            ))}
                                          </select>
                                  kết quả
                                </label>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <div
                                        id="example1_filter"
                                        className="dataTables_filter"
                                      >
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
                                            value={this.state.query}
                                          />
                                        </label>
                                      </div>
                                    </div>
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
                                          <th style={{ width: '3%' }}>#</th>
                                          <th></th>
                                          <th style={{ width: '20%' }}>Tên sản phẩm</th>
                                          <th style={{ width: '10%' }}>SKU</th>
                                          <th style={{ width: '10%' }}>Đơn giá</th>
                                          <th style={{ width: '12%' }}>Số lượng tồn</th>
                                        </tr>
                                      </thead>
                                      <tbody>{this.renderProducts(false)}</tbody>
                                      <tfoot>
                                        <tr>
                                          <th>#</th>
                                          <th></th>
                                          <th>Tên sản phẩm</th>
                                          <th>SKU</th>
                                          <th>Đơn giá</th>
                                          <th>Số lượng tồn</th>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <div
                                      className="dataTables_info"
                                      id="example1_info"
                                      role="status"
                                      aria-live="polite"
                                    >
                                      Hiển thị{' '}
                                      {query == ''
                                        ? start + ' đến ' + end + ' trong '
                                        : ''}{' '}
                                      {totalDocuments} kết quả
                                    </div>
                                  </div>
                                  <div className="col-sm-7">
                                    <div
                                      className="dataTables_paginate paging_simple_numbers"
                                      id="example1_paginate"
                                    >
                                      <ul
                                        className="pagination"
                                        style={{ float: 'right' }}
                                      >
                                        {this.renderPageButtons()}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*/.col (left) */}
                            </div>
                            {/* /.row */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="pendinglist">
                      <div className="row">
                        {/* left column */}
                        <div className="col-md-12">

                          <div className="box-body">
                            <div
                              id="example1_wrapper"
                              className="dataTables_wrapper form-inline dt-bootstrap"
                            >
                              <div className="row">
                                <div>
                                  <div className="col-sm-6">
                                    <div
                                      className="dataTables_length"
                                      id="example1_length"
                                    >
                                      <label>
                                        Hiển thị
                                        <select
                                          onChange={this.handleOnChange}
                                          name="limit"
                                          aria-controls="example1"
                                          style={{ margin: '0px 5px' }}
                                          className="form-control input-sm"
                                          value={this.state.limit}
                                        >
                                          {this.state.sort.map((option) => (
                                            <option
                                              key={option.value}
                                              value={option.value}
                                            >
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>
                                            kết quả
                                        </label>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div
                                      id="example1_filter"
                                      className="dataTables_filter"
                                    >
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
                                          value={this.state.query}
                                        />
                                      </label>
                                    </div>
                                  </div>
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
                                        <th></th>
                                        <th style={{ width: '20%' }}>Tên sản phẩm</th>
                                        <th style={{ width: '20%' }}>SKU</th>
                                        <th style={{ width: '20%' }}>Đơn giá</th>
                                        <th style={{ width: '15%' }}>Số lượng tồn</th>
                                        <th style={{ width: '15%' }}>Trạng thái</th>
                                      </tr>
                                    </thead>
                                    <tbody>{this.renderProducts(true)}</tbody>
                                    <tfoot>
                                      <tr>
                                        <th>#</th>
                                        <th>Tên sản phẩm</th>
                                        <th>SKU</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng tồn</th>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-5">
                                  <div
                                    className="dataTables_info"
                                    id="example1_info"
                                    role="status"
                                    aria-live="polite"
                                  >
                                    Hiển thị{' '}
                                    {query == ''
                                      ? start + ' đến ' + end + ' trong '
                                      : ''}{' '}
                                    {totalDocuments} kết quả
                            </div>
                                </div>
                                <div className="col-sm-7">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="example1_paginate"
                                  >
                                    <ul
                                      className="pagination"
                                      style={{ float: 'right' }}
                                    >
                                      {this.renderPageButtons()}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="warehouse">
                      <section
                        className="content"
                      >
                        <button
                          type="button"
                          id="btnAdd"
                          style={{ float: 'left', margin: '-10px 0 5px 0' }}
                          className="btn btn-primary"
                          data-toggle="modal"
                          onClick={this.addRow}
                        >
                          Thêm dòng
                        </button>
                        <div className="row">
                          <div>
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="example1_length"
                              >

                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="example1_filter"
                                className="dataTables_filter"
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="row" style={{ width: '105%' }}>
                          <div className="col-sm-12">
                            <table
                              id="example1"
                              className="table table-bordered table-striped"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: '2%' }}>#</th>
                                  {propValueList.map((item, index) => (
                                    <th key={index} style={{ width: '15%' }}>
                                      {item.name}
                                    </th>
                                  ))}
                                  <th style={{ width: '20%' }}>Tên sản phẩm</th>
                                  <th style={{ width: '15%' }}>Giá niêm yết</th>
                                  <th style={{ width: '15%' }}>Giá bán</th>
                                  <th style={{ width: '10%' }}>Số lượng tồn</th>
                                  <th style={{ width: '10%' }}>Số lượng nhập</th>
                                  <th style={{ width: '2%' }}></th>
                                </tr>
                              </thead>

                              <tbody>
                                {productList.map((product, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td key={index} bgcolor="#FFFFFF">
                                      <Select
                                        styles={{
                                          control: (base, state) => ({
                                            ...base,
                                            borderColor: 'transparent',
                                          }),
                                        }}
                                        options={products}
                                        getOptionLabel={(option) => option.name + ' - ' + option.SKU}
                                        getOptionValue={(option) => option.id}
                                        name="name"
                                        onChange={(e) => this.onChange(e, index)}
                                      />
                                    </td>
                                    <td
                                      name="marketPrice"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                    >{product.marketPrice}</td>
                                    <td
                                      name="price"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                    >{product.price}</td>
                                    <td
                                      name="qty"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                    >{product.qty}</td>
                                    <td
                                      name="qtyAdd"
                                      bgcolor="#FFFFFF"
                                      style={inputField}
                                      contentEditable="true"
                                      onBlur={(e) => this.onAddingQty(e, index)}
                                    >{product.qtyAdd}</td>
                                    <td bgcolor="#FFFFFF">
                                      <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => this.removeItem(index)}
                                        className="fa fa-trash"
                                      ></div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            style={{ marginRight: '18px', float: 'right' }}
                            className="btn btn-primary"
                            onClick={() => this.onSubmit()}
                          >
                            Tiến hành nhập kho
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>

              {/* /.content */}
            </React.Fragment>
          )}
      </Fragment>
    );
  }
}

Product.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getProducts, showNoti })(Product);
const inputField = {
  '&:focus': {
    outline: 'none',
  },
};
