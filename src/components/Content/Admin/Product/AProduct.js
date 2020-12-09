import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductRow from './ProductRow';
import APendingList from './Tab/APendingList'
import AActiveList from './Tab/AActiveList'

import { getProductVarsByIdShop } from '../../../../state/actions/productVarActions';
import { showNoti } from '../../../../state/actions/notificationActions';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Loader from 'react-loader';

const mapStateToProps = (state) => ({
  productVars: state.productVar.productVars,
  isLoaded: state.productVar.isLoaded,
  totalDocuments: state.product.totalDocuments,
  idShop: state.auth.role.idShop,
  totalDocuments: state.productVar.totalDocuments,
  show: state.modal.show,
  modalName: state.modal.modalName
});

class Product extends Component {
  state = {
    sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
    limit: 5,
    page: 1,
    query: '',
    pages: [],
    start: 1,
    end: 5,
    isNextBtnShow: false,
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
    block: <AActiveList />
  };

  //set lai end khi danh sach chi co 1 trang, va so luong sp khong du limit cua trang do
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const { totalDocuments } = this.props, { end } = this.state
    if (totalDocuments < 5 && end !== totalDocuments) {
      this.setState({ end: totalDocuments })
    }
  }

  renderProducts = (getActive) => {
    const { productVars, isLoaded } = this.props;
    const { start } = this.state;
    return !isLoaded ? (
      <tr>
        <td>
          <Loader></Loader>
        </td>
      </tr>
    ) : (
        productVars.map((p, index) => (
          <ProductRow
            history={this.props.history}
            key={index}
            productVar={p}
            index={index + start - 1}
            getActive={getActive}
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
    console.log(pages);
    if (pages.length > 1) {
      return (
        <>
          {pages.map((eachButton) => (
            <li
              key={eachButton.pageNumber}
              className={
                page === eachButton.pageNumber
                  ? 'paginae_button active'
                  : 'paginate_button'}>
              <a className="paga-link" name="currentPage" href="javascript:void(0);" onClick={() => this.handleChoosePage(eachButton.pageNumber)}>
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
              href="javascript:void(0);"
              onClick={() => this.handleChoosePage(-1)}
            >
              {'>>'}
            </a>
          </li>
        </>
      );
    }
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

  onSubmit = () => {

  }

  createNotification = () => {
    this.props.showNoti(this.state.notiType);
    this.setState({ notiType: '' });
  };

  onTabClick = (name) => {
    const { propValueList, productList } = this.state
    const { products } = this.props

    if (name == 'pending') this.setState({ block: <APendingList /> })
    else if (name == 'active') this.setState({ block: <AActiveList /> })
  }

  render() {
    const { isLoaded, products, totalDocuments, show, modalName } = this.props;
    const { start, end, query, notiType, propValueList, productList, } = this.state;

    return (
      <React.Fragment>
        {/* {notiType !== '' ? this.createNotification() : null}
            <NotificationContainer /> */}

        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1> Sản phẩm </h1>
          <ol className="breadcrumb">
            <li>
              <a href="fake_url">
                <i className="fa fa-dashboard" /> Trang chủ
              </a>
            </li>
            <li>
              <a href="fake_url">Danh sách sản phẩm</a>
            </li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content" >
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li onClick={() => this.onTabClick('active')} className="active">
                <a href="#list" data-toggle="tab">
                  Dánh sách sản phẩm
                </a>
              </li>
              <li onClick={() => this.onTabClick('pending')}>
                <a href="#pendinglist" data-toggle="tab">
                  Chờ duyệt
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {this.state.block}
            </div>
          </div>
        </section>

        {/* /.content */}
      </React.Fragment>
    );
  }
}

Product.propTypes = {
  getProductVarsByIdShop: PropTypes.func.isRequired,
  productVars: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getProductVarsByIdShop, showNoti })(Product);
