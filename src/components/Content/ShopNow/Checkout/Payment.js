import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AddressDetail from "../Checkout/AddressDetail";
import ModalAddressAdd from "../../Modal/ModalAddressAdd";
import Loading from "../Loading/Loading";

import { connect } from "react-redux";
import { pushHistory } from "../../../../state/actions/historyActions";
import { getAddresses } from "../../../../state/actions/addressActions";
import { getPayments } from "../../../../state/actions/paymentActions";
import { showModal } from "../../../../state/actions/modalActions";
import { addOrder } from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  carts: state.cart.carts,
  total: state.cart.total,
  totalCount: state.cart.totalCount,
  addresses: state.address.addresses,
  user: state.authUser.user,
  isLoaded: state.address.isLoaded,
  payments: state.payment.payments,
  isPMLoaded: state.payment.isPMLoaded,
  show: state.modal.show,
  modalName: state.modal.modalName,
  idShop: state.role.idShop,
  isAdded: state.order.isAdded,
});

class Payment extends React.Component {
  state = {
    chkboxVal: "",
    isCardHidden: true,
    address: "",
    idAddress: "",
    idPaymentMethod: "",
    idCity: "",
    idWard: "",
    numberAndStreet: "",
    recipient: "",
    phone: "",
    saleOffPercentage: "",

    isTransition: false,
  };

  componentDidMount() {
    const { getAddresses, getPayments, user } = this.props;
    getAddresses({ limit: 1000, page: 1, idUser: user.id, type: "user" });
    getPayments({ limit: 1000, page: 1 });
    console.log(this.props.history.location.selectedPromo);
  }

  componentDidUpdate() {
    if (this.props.isAdded) {
      setTimeout(() => this.props.history.push("/shopnow/order-receipt"), 1200);
    }
  }

  convertTotal = (total) => {
    const { selectedPromo } = this.props.history.location;
    let totalWithDisCount = total;
    if (selectedPromo && selectedPromo !== "")
      totalWithDisCount = total - selectedPromo.discountAmount;
    return totalWithDisCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  addressChkboxChange = (item) => {
    const {
      id,
      idCity,
      idDistrict,
      idWard,
      numberAndStreet,
      fullname,
      phone,
    } = item;
    this.setState({
      idCity,
      idDistrict,
      idWard,
      numberAndStreet,
      recipient: fullname,
      phone,
    });
    this.setState({ idAddress: id });
  };

  paymentChkboxChange = (e) => {
    const { value, name } = e.target;
    if (value == 2) this.setState({ isCardHidden: false });
    else this.setState({ isCardHidden: true });
    this.setState({ idPaymentMethod: value });
  };

  submit = (e) => {
    e.preventDefault();
    const {
      idPaymentMethod,
      idCity,
      idDistrict,
      idWard,
      numberAndStreet,
      phone,
      recipient,
    } = this.state;
    const { user, carts, addOrder } = this.props;
    let newOrder = {},
      arrayOfProductVar = [];
    newOrder = {
      idPromotion: this.props.history.location.selectedPromo
        ? this.props.history.location.selectedPromo.id
        : null,
      idPaymentMethod,
      idUser: user.id,
      idCity,
      idDistrict,
      idWard,
      numberAndStreet,
      recipient,
      phone,
      arrayOfProductVar: [],
    };
    carts.map((c) => {
      c.productVars.map(({ amount, id }) => {
        arrayOfProductVar.push({ amount, id });
      });
    });
    newOrder.arrayOfProductVar = arrayOfProductVar;
    console.log(newOrder);

    this.setState({ isTransition: true });
    addOrder(newOrder);
  };

  render() {
    const {
      isCardHidden,
      idAddress,
      isTransition,
      idPaymentMethod,
      recipient,
    } = this.state;
    const {
      isLoaded,
      addresses,
      payments,
      carts,
      total,
      totalCount,
      show,
      modalName,
      showModal,
    } = this.props;
    const { selectedPromo } = this.props.history.location;

    return (
      <Fragment>
        {isTransition && <Loading />}
        {show && (modalName == "addressAdd" || modalName == "addressEdit") && (
          <ModalAddressAdd />
        )}
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <div className="nohome-section"></div>
          <div className="cart-container">
            <div className="cart-card">
              <div className="address-container">
                <h3>Địa chỉ giao hàng</h3>
                {isLoaded && (
                  <div className="form-group" style={{ marginBottom: "-10px" }}>
                    {addresses.map((item, index) => {
                      return (
                        <AddressDetail
                          key={index}
                          item={item}
                          addressChkboxChange={this.addressChkboxChange}
                        />
                      );
                    })}
                  </div>
                )}

                <div className="row-flex">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#3571a7",
                      margin: "10px 10px 0 0",
                    }}
                    onClick={() =>
                      showModal({ show: true, modalName: "addressAdd" })
                    }
                  >
                    Thêm địa chỉ
                  </Button>
                  <Button
                    style={{
                      color: "black",
                      backgroundColor: "#fff",
                      marginTop: "10px",
                      border: "1px solid #ccc",
                    }}
                    onClick={() =>
                      showModal({
                        show: true,
                        modalName: "addressEdit",
                        details: { id: idAddress },
                      })
                    }
                  >
                    Sửa
                  </Button>
                </div>
                <h3 style={{ marginTop: "50px" }}>Hình thức thanh toán</h3>
                <div className="form-group">
                  {payments.map((item, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value={item.id}
                            onClick={(e) => this.paymentChkboxChange(e)}
                          />
                          {item.methodName}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {isCardHidden ? null : (
                  <div>
                    <div className="pm-card">
                      <div className="row-flex-space">
                        <div className="visa-card">
                          <img src="../img/visa.png" alt="visa" />
                        </div>
                        <p>X</p>
                      </div>
                      <p> Card Number</p>
                      <p> **** **** **** 2847</p>
                      <p>Nguyễn Huỳnh Thanh Tâm</p>
                    </div>
                    <div className="row-flex">
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#3571a7",
                          margin: "10px 10px 0 0",
                        }}
                      >
                        Thêm thẻ
                      </Button>
                      <Button
                        style={{
                          color: "black",
                          backgroundColor: "#fff",
                          marginTop: "10px",
                          border: "1px solid #ccc",
                        }}
                      >
                        Sửa
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="center-col-flex">
                <p>Đơn hàng ({totalCount} sản phẩm)</p>
                {carts.map((c) => {
                  return c.productVars.map((p, index) => {
                    return (
                      <div key={index} className="pm-order">
                        <div className="pm-orderdet">
                          <h5>{p.amount}x</h5>
                          <Link
                            to={{
                              pathname: `/shopnow/product-detail/idProduct/${p.Product.id}/idShop/${p.idShop}`,
                            }}
                          >
                            {p.name}
                          </Link>
                        </div>
                        <div>
                          {p.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          đ
                        </div>
                      </div>
                    );
                  });
                })}

                {selectedPromo && (
                  <div className="temp-total">
                    <div> Giảm giá</div>
                    <div className="temp-total-val">
                      {" "}
                      -
                      {selectedPromo.discountAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      đ
                    </div>
                  </div>
                )}
                <div className="checkout">
                  <p> Thành tiền </p>
                  <p className="total"> {this.convertTotal(total)}đ</p>
                </div>
                <Button
                  style={
                    idPaymentMethod == "" || recipient == ""
                      ? {
                          color: "grey",
                          backgroundColor: "#f5f5f5",
                          width: "100%",
                          marginTop: "20px",
                          pointerEvents: "none",
                          cursor: "no-drop",
                        }
                      : {
                          color: "white",
                          backgroundColor: "#3571a7",
                          width: "100%",
                          marginTop: "20px",
                          cursor: "pointer",
                        }
                  }
                  // disabled={idPaymentMethod == "" || recipient == ""}
                  onClick={(e) => this.submit(e)}
                >
                  Đặt mua
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, {
  pushHistory,
  getAddresses,
  getPayments,
  showModal,
  addOrder,
})(Payment);
