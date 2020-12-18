import React from "react";
import Button from "@material-ui/core/Button";
import "font-awesome/css/font-awesome.min.css";
import "../../../../assets/css/cart.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from 'react-loader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pushHistory } from '../../../../state/actions/historyActions';
import { getCartsByIdUser } from '../../../../state/actions/cartActions';
import { deleteCart } from '../../../../state/actions/cartActions';
import { updateCart } from '../../../../state/actions/cartActions';
import { showModal } from '../../../../state/actions/modalActions';

import CartDetail from "./CartDetail";
import ModalPromotions from "../../Modal/ModalPromotions"

const mapStateToProps = (state) => ({
  history: state.history.history,
  carts: state.cart.carts,
  promotions: state.cart.promotions,
  total: state.cart.total,
  isLoaded: state.cart.isLoaded,
  user: state.authUser.user,
  show: state.modal.show,
  modalName: state.modal.modalName
});

class Cart extends React.Component {
  state = {
    total: 0,
    selectedPromo: '',
    idPromo: ''
  };

  convertTotal = (total) => {
    let totalWithDisCount = total
    if (this.state.selectedPromo !== '') totalWithDisCount = total - this.state.selectedPromo.discountAmount
    return totalWithDisCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  componentDidMount() {
    const { getCartsByIdUser, user } = this.props
    getCartsByIdUser({ limit: 1000, page: 1, idUser: user.id })
  }

  amountChange = (valChanged, idCart, idProductVar) => {
    console.log("idCart: ", idCart)
    if (valChanged == 0) return
    const { carts, updateCart, user } = this.props
    for (let i in carts) {
      for (let j in carts[i].productVars) {
        if (carts[i].productVars[j].id == idProductVar) {
          updateCart({ id: idCart, amount: valChanged, idUser: user.id })
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

  pickPromo = (selectedPromo) => {
    console.log(selectedPromo)
    this.setState({ selectedPromo })
  }

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + '-' + month + '-' + dt;
  };

  showMoreInfor = (idPromo) => {
    if (this.state.idPromo !== '') this.setState({ idPromo: '' })
    else this.setState({ idPromo })
  }

  render() {
    const { selectedPromo, idPromo } = this.state;
    const { carts, total, isLoaded, show, modalName, promotions } = this.props
    return (
      <div>
        <Header />
        {show && modalName == 'modalPromotions' && <ModalPromotions />}
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
                    <img src="../img/noitem.png" alt="photo" />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                  </div>}

                <div className="center-col-flex">

                  <p className="promo-title">Mã giảm giá</p>
                  <div className="ui action input" style={{ width: '100%' }}>
                    <input type="text" placeholder="Nhập ở đây..." />
                    <button className="ui button">Áp dụng</button>
                  </div>
                  <div className="promo-wrapper" onClick={() => { this.props.showModal({ show: true, details: { promotions, pickPromo: this.pickPromo }, modalName: 'modalPromotions' }) }}>
                    <i style={{ color: '#3571a7' }} className="fa fa-gift"></i>
                    <div className="promo-list">Chọn mã giảm giá </div>
                  </div>

                  {selectedPromo !== '' &&
                    <div className='voucher-tag'>
                      <div className="col-flex">
                        <div className="infor-voucher">
                          <div className="voucher-infor">
                            <h2>{selectedPromo.couponCode} </h2>
                            <p>Đến {this.convertDate(selectedPromo.timeEnd)}</p>
                          </div>
                          <div className="more-infor" onClick={() => this.showMoreInfor(selectedPromo.id)}>i</div>
                          <button className="btn btn-default" onClick={() => this.setState({ selectedPromo: '' })} >
                            Bỏ chọn
                          </button>
                        </div>
                        {idPromo !== '' && <div className="info-det">{selectedPromo.name}</div>}
                      </div>
                    </div>}

                  {selectedPromo !== '' &&
                    <div className="temp-total" style={{ width: '108%' }}>
                      <div> Giảm giá</div>
                      <div className="temp-total-val"> -{selectedPromo.discountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</div>
                    </div>}
                  <div className="checkout" style={{ width: '108%' }}>
                    <p> Thành tiền</p>
                    {isLoaded && <p className="total"> {this.convertTotal(total)}đ</p>}
                  </div>

                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#3571a7",
                      width: "108%",
                      marginTop: "20px"
                    }}
                    onClick={() => this.props.history.push({ pathname: '/shopnow/checkout/payment', selectedPromo: selectedPromo != '' ? selectedPromo : null })}>
                    Tiến hành đặt hàng
                  </Button>
                </div>
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
export default connect(mapStateToProps, { pushHistory, getCartsByIdUser, deleteCart, updateCart, showModal })(Cart);
