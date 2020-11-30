import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserProfile from "./UserProfile";

class Account extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
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
              padding: "20px"
            }}>

            <UserProfile selectedItem={this.props} />

            <div className="acc-container">
              <form
                style={{ fontFamily: "Poppins, sans-serif", color: "#0d1136" }}
                className="ui form"
                onSubmit={this.handleSubmit}
              >
                <div className="field">
                  <label style={{ fontWeight: "400", fontSize: "15px" }}>
                    Họ tên
                  </label>
                  <input required type="text" name="fullname" placeholder="Họ tên" />
                </div>
                <div className="field">
                  <label style={{ fontWeight: "400", fontSize: "15px" }}>
                    Họ tên
                  </label>
                  <input required type="text" name="username" placeholder="Tài khoản đăng nhập" />
                </div>
                <div className="field">
                  <label style={{ fontWeight: "400", fontSize: "15px" }}>
                    Số điện thoại
                  </label>
                  <input type="text" name="phone" placeholder="Số điện thoại" />
                </div>
                <div className="field">
                  <label style={{ fontWeight: "400", fontSize: "15px" }}>
                    Email
                  </label>
                  <input type="text" name="email" placeholder="Email" />
                </div>
                {/* <div className="field">
                  <label style={{ fontWeight: "400", fontSize: "15px" }}>
                    Giới tính
                  </label>
                  <div>
                    <select className="ui dropdown">
                      <option value="1">Nam</option>
                      <option value="0">Nứ</option>
                    </select>
                  </div>
                </div> */}

                <button
                  style={{ backgroundColor: "#3571a7", color: "white", fontWeight: "400" }}
                  className="ui button"
                  type="submit">
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Account;
