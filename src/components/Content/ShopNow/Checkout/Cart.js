import React from "react";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from 'react-loader';
import CartDetail from "./CartDetail";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pushHistory } from '../../../../state/actions/historyActions';
import { getCartsByIdUser } from '../../../../state/actions/cartActions';
import { deleteCart } from '../../../../state/actions/cartActions';
import { updateCart } from '../../../../state/actions/cartActions';

const mapStateToProps = (state) => ({
  carts: state.cart.carts,
  total: state.cart.total,
  isLoaded: state.cart.isLoaded,
  user: state.authUser.user
});

class Cart extends React.Component {
  state = {
    total: 0
  };

  // getTotal = () => {
  //   console.log(carts);
  //   let total = 0
  //   if (carts.length > 0) {
  //     carts.map(item => {
  //       item.productVars.map(p => {
  //         total += Number(p.price) * p.amount
  //       })
  //     })
  //   }
  //   return total
  // }

  componentDidMount() {
    const { getCartsByIdUser, user } = this.props
    getCartsByIdUser({ limit: 1000, page: 1, idUser: user.id })
  }

  amountChange = (valChanged, productVarid) => {
    if (valChanged == 0) return
    const { carts, updateCart, user } = this.props
    for (let i in carts) {
      for (let j in carts[i].productVars) {
        if (carts[i].productVars[j].id == productVarid) {
          console.log(productVarid);
          updateCart({ id: productVarid, amount: valChanged, idUser: user.id })
          break;
        }
      }
    }
  }

  deleteCartItem = (itemId) => {
    const { user } = this.props
    this.props.deleteCart({ id: itemId, idUser: user.id })
  }

  checkout = () => { };

  render() {
    const { } = this.state;
    const { carts, total, isLoaded } = this.props
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
          {!isLoaded ? <Loader></Loader> :
            <div className="cart-container">
              <div className="cart-card">
                {carts.length > 0 ?
                  <div className="order-wrapper">
                    {carts.map((cItem, cIndex) => {
                      return (
                        <div key={cIndex} className="order-list">
                          <p> {cItem.name} {'>'} </p>
                          {cItem.productVars.map((item, index) => {
                            return <CartDetail key={index} item={item} cItem={cItem}
                              deleteCartItem={this.deleteCartItem} amountChange={this.amountChange} />;
                          })}
                        </div>
                      )
                    })}
                  </div> : <div className="cart-noitem">
                    <img src="../img/noitem.png" alt="visa" />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                  </div>}


                <div className="center-col-flex">
                  <p className="promo-title">Mã giảm giá</p>
                  <div className="ui action input">
                    <input type="text" placeholder="Nhập ở đây..." />
                    <button className="ui button">Áp dụng</button>
                  </div>
                  <div className="checkout">
                    <p> Thành tiền</p>
                    {isLoaded && <p className="total"> {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</p>}
                  </div>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#3571a7",
                      width: "108%",
                      marginTop: "20px"
                    }}
                    onClick={() => this.props.pushHistory('/checkout/payment')}>
                    Tiến hành đặt hàng
                </Button>
                </div>`
          </div>
            </div>}

        </div>
        <Footer />
      </div >
    );
  }
}

Cart.propTypes = {
  getCartsByIdUser: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  carts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, { pushHistory, getCartsByIdUser, deleteCart, updateCart })(Cart);
