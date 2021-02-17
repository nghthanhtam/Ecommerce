import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LaterListDetail from "./LaterListDetail";
import UserProfile from "./UserProfile";

class Wishlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
      orderList: [1, 2, 3, 4, 5],
      profileItemList: [
        { name: "Thông tin khách hàng" },
        { name: "Sản phẩm mua sau" },
      ],
      header: "header",
      picLink: "./img/blue.png",
      section: "section-blue",
      left: 0,
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
            marginBottom: "280px",
            position: "relative",
            backgroundColor: "#f0f0f0",
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
            <UserProfile selectedLink="/shopnow/user/wishlist" />
            <div className="later-order-list">
              {orderList.map((item) => {
                return <LaterListDetail key={item._id} />;
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Wishlist;
