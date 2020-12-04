import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserOrders } from '../../../../state/actions/orderActions'
import { showModal } from '../../../../state/actions/modalActions'

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserProfile from "./UserProfile";
import ModalCanCel from "../../Modal/ModalCancel"

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  user: state.authUser.user,
  isLoaded: state.order.isLoaded,
  show: state.modal.show,
  modalName: state.modal.modalName
});

class OrderHistory extends React.Component {
  state = {
    profileItemList: [
      { name: "Thông tin khách hàng" },
      { name: "Sản phẩm mua sau", link: "/user/later-list" },
    ],
    header: "header",
    picLink: "./img/blue.png",
    section: "section-blue",
    left: 0,

    selectedOrderId: '',
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const { getUserOrders, user } = this.props
    getUserOrders({ limit: 1000, page: 1, idUser: user.id })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 10) {
      this.setState({ header: "header1" });
    } else {
      this.setState({ header: "header" });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + "px",
    });
  };

  selectOrder = (selectedOrderId) => {
    this.setState({ selectedOrderId })
  }

  render() {
    const { selectedOrderId } = this.state;
    const { orders, isLoaded, show, modalName } = this.props;
    return (
      <div>
        {show && modalName == 'modalCancel' && <ModalCanCel />}
        <Header />

        <div style={{ zIndex: 10, marginBottom: "300px", position: "relative", backgroundColor: "#f7f7f7" }}>
          <div className="nohome-section"></div>

          <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <UserProfile selectedItem={this.props} />

            <div className="orderhis-container">

              <div className="my-order">
                <h2 style={{ color: '#0d1136', marginBottom: '20px' }}>Đơn hàng</h2>
                {isLoaded && orders.map((item, index) =>
                  <>
                    <div key={index} className={item.id == selectedOrderId ? 'order-box-selected' : 'order-box'} onClick={() => this.selectOrder(item.id)}>
                      <div className="orderhis-line1" >
                        <h4>Đơn hàng #{item.id}</h4>
                        <div className="status-btn">{item.status == 'pending' ? 'Đang chờ xử lý' : (item.status == 'in transit' ? 'Đang giao hàng' : (item.status == 'delivered' ? 'Đã nhận hàng' : (item.status !== 'received' ? 'Đã tiếp nhận' : 'Đã hủy')))}</div>
                      </div>
                      <div className="orderhis-line" >
                        <p>Ngày đặt</p>
                        <p>{new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/{new Date(item.createdAt).getFullYear()}</p>
                      </div>
                      <div className="orderhis-line" >
                        <p>Ngày giao hàng </p>
                        <p>{new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/{new Date(item.createdAt).getFullYear()}</p>
                      </div>
                      <div className="orderhis-line" >
                        <h4>Tổng tiền </h4>
                        <div style={{ fontWeight: '600' }}>{item.totalPrice}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="order-details">
                <div className="orderhis-title">Chi tiết đơn hàng</div>
                {isLoaded && orders.map(item =>
                  item.id == selectedOrderId &&
                  <>
                    <div className="detail-infor">
                      <div className="orderhis-address">
                        <h4>Địa chỉ giao hàng</h4>
                        <p>{item.numberAndStreet},{' '}{item.Ward.ward},{' '}{item.District.district},{' '}{item.City.city}</p>
                      </div>
                      <div className="orderhis-total">
                        <div className="orderhis-line" >
                          <p>Giảm giá </p>
                          <p>0đ</p>
                        </div>
                        <div className="orderhis-line" >
                          <p>Phí vận chuyển</p>
                          <p>0đ</p>
                        </div>
                        <div className="orderhis-line" >
                          <h4>Tổng tiền </h4>
                          <div style={{ fontWeight: '600' }}>{item.totalPrice}</div>
                        </div>
                      </div>
                    </div>
                    <div className="status-wrapper">
                      {item.status == 'canceled' ?
                        <p style={{ color: 'red', fontSize: '17px' }}>Đơn hàng đã hủy</p> :
                        <>
                          <div className="status-circle"> <i
                            style={{ display: 'flex', justifyContent: 'center', marginTop: '7px', color: 'white' }}
                            className="fa fa-check"
                          ></i></div>
                          <div className="status-line"></div>
                          <div className="status-line-no"></div>

                          {(item.status == 'in transit' || item.status == 'delivered') ?
                            <>
                              <div className="status-circle"> <i className="status-tick fa fa-check"></i></div>
                              <div className="status-line"></div>
                            </>
                            :
                            <>
                              <div className="status-circle-no"> 2</div>
                              <div className="status-line-no"></div>
                            </>}
                          {item.status == 'delivered' ?
                            <>
                              <div className="status-line"></div>
                              <div className="status-circle"> <i className="status-tick fa fa-check"></i></div>
                            </> :
                            <>
                              <div className="status-line-no"></div>
                              <div className="status-circle-no"> 3</div>
                            </>}
                        </>}
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table id="example1"
                          className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th style={{ width: '20%' }}></th>
                              <th style={{ width: '20%' }}>Sản phẩm</th>
                              <th style={{ width: '20%' }}>Số lượng</th>
                              <th style={{ width: '20%' }}>Đơn giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.ProductVars.map((o, index) => {
                              return (
                                <tr key={index}>
                                  <td><img src={o.Images[0].url} alt="hình ảnh" border='4' height='100' width='80' /></td>
                                  <td>{o.name}</td>
                                  <td>{o.quantity}</td>
                                  <td>{o.priceWhenBuy}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {item.status !== 'canceled' &&
                      <button onClick={() => this.props.showModal({ show: true, modalName: 'modalCancel', details: { order: item } })}
                        type="button" className="btn btn-block btn-default">Hủy đơn hàng</button>
                    }
                  </>
                )}

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div >
    );
  }
}

export default connect(mapStateToProps, { getUserOrders, showModal })(OrderHistory);
