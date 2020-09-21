import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { ObjectId } from "mongodb";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "font-awesome/css/font-awesome.min.css";
import "../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AddressDetail from "../Checkout/AddressDetail";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      addList: [
        {
          _id: ObjectId("507c7f79bcf86cd7994f6c0e").toString(),
          label: "Nguyễn Huỳnh Thanh Tâm",
        },
        {
          _id: ObjectId("507c7f78bcf86cd7994f6c0e").toString(),
          label: "Nguyễn Tây Trung",
        },
      ],
      chkboxVal: "",
      isCardHidden: true,
    };
  }
  checkout = () => {};
  chkboxChange = (e) => {
    console.log(e.target);
  };
  paymentChkboxChange = (e) => {
    if (e.target.value === "card") this.setState({ isCardHidden: false });
    else this.setState({ isCardHidden: true });
  };

  render() {
    let { addList, isCardHidden } = this.state;
    return (
      <div>
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

                <RadioGroup
                  aria-label="address"
                  // name={chkboxVal}
                  // value={chkboxVal}
                  onChange={(e) => this.chkboxChange(e)}
                >
                  {addList.map((item) => {
                    return <AddressDetail item={item} />;
                  })}
                </RadioGroup>
                <div className="row-flex">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#3571a7",
                      margin: "10px 10px 0 0",
                    }}
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
                  >
                    Sửa
                  </Button>
                </div>
                <h3>Hình thức thanh toán</h3>
                <RadioGroup
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
                </RadioGroup>
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
                <div className="pm-order">
                  <div className="pm-orderdet">
                    <h5>2x</h5>
                    <Link to="/product-detail">
                      Moojt noi com dien ap chao thiet la dep la dep la dep la
                      dep
                    </Link>
                  </div>
                  <div>2000000đ</div>
                </div>
                <div className="pm-order">
                  <div className="pm-orderdet">
                    <h5>2x</h5>
                    <Link to="/product-detail">
                      Moojt noi com dien ap chao thiet la dep la dep la dep la
                      dep
                    </Link>
                  </div>
                  <div>2000000đ</div>
                </div>
                <div className="checkout">
                  <h4> Thành tiền</h4>
                  <p className="total"> 200000đ</p>
                </div>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#3571a7",
                    width: "100%",
                    marginTop: "20px",
                  }}
                  onClick={() => this.checkout()}
                >
                  Đặt mua
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Cart;
