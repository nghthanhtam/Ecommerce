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

            <div className="acc-container">
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.createAt}</td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default OrderHistory;
