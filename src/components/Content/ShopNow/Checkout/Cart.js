import React from "react";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CartDetail from "./CartDetail";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pushHistory } from '../../../../state/actions/historyActions';
import { getCartsByIdUser } from '../../../../state/actions/cartActions';

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  isLoaded: state.cart.isLoaded,
  user: state.authUser.user
});

class Cart extends React.Component {
  state = {
    orderList: [1, 2, 3,],
  };

  componentDidMount() {
    const { getCartsByIdUser, user } = this.props
    getCartsByIdUser({ limit: 1000, page: 1, idUser: user.id })
  }

  deleteCartItem = (itemId) => {
    console.log('itemId: ', itemId);
  }

  checkout = () => { };

  render() {
    const { orderList } = this.state;
    const { carts, isLoaded } = this.props
    return (
      <div>
        <Header />
        <div
          style={{
            zIndex: 10,
            marginBottom: '300px',
            position: 'relative',
            backgroundColor: '#f7f7f7',
          }}
        >
          <div className="nohome-section"></div>
          <div className="cart-container">
            <div className="cart-card">
              {!isLoaded ? null :
                <div className="order-wrapper">
                  {carts.map((cItem, cIndex) => {
                    return (
                      <div key={cIndex} className="order-list">
                        <p> {cItem.name} > </p>
                        {cItem.productVars.map((item, index) => {
                          return <CartDetail key={index} item={item} cItem={cItem} deleteCartItem={this.deleteCartItem} />;
                        })}
                      </div>
                    )
                  })}
                </div>}

              <div className="center-col-flex">
                <p className="promo-title">Mã giảm giá</p>
                <div className="ui action input">
                  <input type="text" placeholder="Nhập ở đây..." />
                  <button className="ui button">Áp dụng</button>
                </div>
                <div className="checkout">
                  <p> Thành tiền</p>
                  <p className="total"> 200000đ</p>
                </div>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#3571a7",
                    width: "108%",
                    marginTop: "20px",
                  }}
                  onClick={() => this.props.pushHistory('/checkout/payment')}
                >
                  Tiến hành đặt hàng
              </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

Cart.propTypes = {
  getCartsByIdUser: PropTypes.func.isRequired,
  carts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, { pushHistory, getCartsByIdUser })(Cart);
