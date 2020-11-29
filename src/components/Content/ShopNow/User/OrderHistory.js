import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserProfile from "./UserProfile";

class OrderHistory extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profileItemList: [
        { name: "Thông tin khách hàng" },
        { name: "Sản phẩm mua sau", link: "/user/later-list" },
      ],
      header: "header",
      picLink: "./img/blue.png",
      section: "section-blue",
      left: 0,
      orderList: [
        {
          _id: "001",
          createAt: "12/02/2020",
          total: 20000,
          status: "Giao hàng thành công",
        },
      ],
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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

  render() {
    let { orderList } = this.state;
    return (
      <div>
        <Header />

        <div
          style={{
            zIndex: 10,
            marginBottom: "300px",
            position: "relative",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="nohome-section"></div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <UserProfile selectedItem={this.props} />

            <div className="orderhis-container">
              <div className="my-order">
                <h2>Đơn hàng</h2>
                <div className='order-box'>
                  <div className="orderhis-line1" >
                    <h4>Order #1</h4>
                    <div className="status-btn">Đang vận chuyển</div>
                  </div>
                  <div className="orderhis-line" >
                    <p>Ngày đặt</p>
                    <p>12/02/2020</p>
                  </div>
                  <div className="orderhis-line" >
                    <p>Ngày giao hàng </p>
                    <p>16/02/2020</p>
                  </div>
                  <div className="orderhis-line" >
                    <h4>Tổng tiền </h4>
                    <div style={{ fontWeight: '600' }}>280000</div>
                  </div>
                </div>
              </div>
              <div className="order-details">
                <div className="orderhis-title">Chi tiết đơn hàng</div>
                <div className="detail-infor">
                  <div className="orderhis-address">
                    <h4>Địa chỉ giao hàng</h4>
                    <p>672 Le Duc Tho, P.15, Go Vap, HCM</p>
                  </div>
                  <div className="orderhis-total">
                    <div className="orderhis-line" >
                      <p>Giảm giá </p>
                      <p>325000đ</p>
                    </div>
                    <div className="orderhis-line" >
                      <p>Phí vận chuyển</p>
                      <p>325000đ</p>
                    </div>
                    <div className="orderhis-line" >
                      <h4>Tổng tiền </h4>
                      <div style={{ fontWeight: '600' }}>280000</div>
                    </div>
                  </div>
                </div>
                <div className="status-wrapper">
                  <div className="status-circle"> <i
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '7px', color: 'white' }}
                    class="fa fa-check"
                  ></i></div>
                  {/* <div className="status-circle-no"> 1</div> */}
                  <div className="status-line-no"></div>
                  <div className="status-circle-no"> 2</div>
                  {/* <div className="status-line"></div> */}
                  {/* <div className="status-circle"></div> */}
                  <div className="status-line-no"></div>
                  <div className="status-circle-no"> 3</div>
                  {/* <div className="status-line"></div> */}
                  {/* <div className="status-circle"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div >
    );
  }
}

export default OrderHistory;
