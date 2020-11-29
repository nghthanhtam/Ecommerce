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
import AddressAdd from "./AddressAdd";

import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';
import { getAddresses } from '../../../../state/actions/addressActions';
import { getPayments } from '../../../../state/actions/paymentActions';
import { showModal } from '../../../../state/actions/modalActions';

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  total: state.cart.total,
  addresses: state.address.addresses,
  user: state.authUser.user,
  isLoaded: state.address.isLoaded,
  payments: state.payment.payments,
  isPMLoaded: state.payment.isPMLoaded,
  show: state.modal.show,
  modalName: state.modal.modalName
});

class Payment extends React.Component {
  state = {
    chkboxVal: "",
    isCardHidden: true,
    address: '',
    idAddress: ''
  };

  componentDidMount() {
    const { getAddresses, getPayments, getProductVarById, user } = this.props
    getAddresses({ limit: 1000, page: 1, idUser: user.id })
    //getPayments({ limit: 1000, page: 1 })
  }

  checkout = () => { };

  addressChkboxChange = (id) => {
    const { addresses } = this.props
    for (let i in addresses) {
      if (addresses[i].id == id) {
        this.setState({ idAddress: id })
        this.setState({ address: addresses[i].address })
      }
    }
  };

  paymentChkboxChange = (e) => {
    if (e.target.value == 2) this.setState({ isCardHidden: false });
    else this.setState({ isCardHidden: true });
  };

  render() {
    const { isCardHidden, idAddress } = this.state;
    const { isLoaded, addresses, payments, carts, total, show, modalName, showModal } = this.props;
    return (
      <Fragment>
        {show && modalName == 'addressAdd' && (
          <AddressAdd />
        )}
        <Header />
        <div style={{
          zIndex: 10,
          marginBottom: "300px",
          position: "relative",
          backgroundColor: "#fff",
        }}>
          <div className="nohome-section"></div>
          <div className="cart-container">
            <div className="cart-card">
              <div className="address-container">
                <h3>Địa chỉ giao hàng</h3>
                {isLoaded &&
                  <div className="form-group">
                    {addresses.map((item, index) => {
                      return <AddressDetail key={index} item={item} addressChkboxChange={this.addressChkboxChange} />;
                    })}
                  </div>}

                <div className="row-flex">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#3571a7",
                      margin: "10px 10px 0 0",
                    }}
                    onClick={() => showModal({ show: true, modalName: 'addressAdd' })}
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
                    onClick={() => showModal({ show: true, modalName: 'addressAdd', details: { id: idAddress } })}>
                    Sửa
                  </Button>
                </div>
                <h3>Hình thức thanh toán</h3>
                <div className="form-group">
                  {payments.map((item, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input type="radio" name="payment" value={item.id} onClick={(e) => this.paymentChkboxChange(e)} />
                          {item.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
                {/* <RadioGroup
                  aria-label="payment"
                  onChange={(e) => this.paymentChkboxChange(e)}
                >
                  <FormControlLabel
                    color="default"
                    value="cash"
                    control={<Radio color="default" />}
                    label="Thanh toán bằng tiền mặt"
                  />
                  <FormControlLabel
                    color="default"
                    value="card"
                    control={<Radio color="default" />}
                    label="Thanh toán bằng thẻ quốc tế"
                  />
                </RadioGroup> */}
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
                <p>Đơn hàng (7 sản phẩm)</p>
                {carts.map(c => {
                  return (c.productVars.map(p => {
                    return (
                      <div className="pm-order">
                        <div className="pm-orderdet">
                          <h5>{p.amount}x</h5>
                          <Link to={{ pathname: "/product-detail", productDet: {} }}>
                            {p.name}
                          </Link>
                        </div>
                        <div>{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</div>
                      </div>
                    )
                  }))
                })}

                <div className="checkout">
                  <h4> Thành tiền</h4>
                  <p className="total"> {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>
                </div>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#3571a7",
                    width: "100%",
                    marginTop: "20px",
                  }}
                  onClick={() => this.props.pushHistory('/checkout/order-receipt')}>
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

export default connect(mapStateToProps, { pushHistory, getAddresses, getPayments, showModal })(Payment);
