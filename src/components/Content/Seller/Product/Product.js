import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PendingList from "./Tab/PendingList";
import ActiveList from "./Tab/ActiveList";
import QtyUpdate from "./Tab/QtyUpdate";
import { getProductVarsByIdShop } from "../../../../state/actions/productVarActions";
import { showNoti } from "../../../../state/actions/notificationActions";
import "react-notifications/lib/notifications.css";

const mapStateToProps = (state) => ({
  productVars: state.productVar.productVars,
  isLoaded: state.productVar.isLoaded,
  totalDocuments: state.product.totalDocuments,
  idShop: state.auth.role.idShop,
  totalDocuments: state.productVar.totalDocuments,
  show: state.modal.show,
  modalName: state.modal.modalName,
});

class Product extends Component {
  state = {
    sort: [{ value: 5 }, { value: 10 }, { value: 20 }],
    limit: 5,
    page: 1,
    query: "",
    pages: [],
    start: 1,
    end: 5,
    isNextBtnShow: true,
    isPriceBoardHidden: true,
    skuproduct: {
      index: 0,
      id: 0,
      productId: "",
      name: "",
      sku: "",
      marketPrice: 0,
      price: 0,
      qty: 0,
      qtyAdd: 0,
      status: 1,
    },
    block: <ActiveList />,
  };

  onChange = (e, index) => {
    this.setState((prepState) => {
      let productList = [...prepState.productList];
      let { id, idProduct, idShop, SKU, marketPrice, name, price, status } = e;

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
        status,
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

  createNotification = () => {
    this.props.showNoti(this.state.notiType);
    this.setState({ notiType: "" });
  };

  onTabClick = (name) => {
    if (name == "pending") this.setState({ block: <PendingList /> });
    else if (name == "active") this.setState({ block: <ActiveList /> });
    else this.setState({ block: <QtyUpdate /> });
  };

  render() {
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
        <section className="content">
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li onClick={() => this.onTabClick("active")} className="active">
                <a href="#list" data-toggle="tab">
                  Dánh sách sản phẩm
                </a>
              </li>
              <li onClick={() => this.onTabClick("pending")}>
                <a href="#pendinglist" data-toggle="tab">
                  Chờ duyệt
                </a>
              </li>
              <li onClick={() => this.onTabClick("qtyupdate")}>
                <a href="#warehouse" data-toggle="tab">
                  Nhập kho
                </a>
              </li>
            </ul>
            <div className="tab-content">{this.state.block}</div>
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

export default connect(mapStateToProps, { getProductVarsByIdShop, showNoti })(
  Product
);
