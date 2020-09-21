import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserProfile from "./UserProfile";

class AddressBook extends React.Component {
  constructor(props) {
    super();
    this.state = {
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
              <div className="edit-text">+ Thêm địa chỉ</div>
              <div className="address-det">
                <div className="address-box">
                  <p className="add-name">Nguyễn Huỳnh Thanh Tâm</p>
                  <div className="add">
                    <p className="add1">Địa chỉ:</p>
                    <p>679 Lê Đức Thọ, P15, Gò Vấp , TPHCM</p>
                  </div>
                  <div className="row-flex">
                    <p className="tel1">Điện thoại:</p>
                    <p>0778895138</p>
                  </div>
                </div>
                <div className="edit-text">Chỉnh sửa</div>
              </div>
              <div className="address-det">
                <div className="address-box">
                  <p className="add-name">Nguyễn Huỳnh Thanh Tâm</p>
                  <div className="add">
                    <p className="add1">Địa chỉ:</p>
                    <p>679 Lê Đức Thọ, P15, Gò Vấp , TPHCM</p>
                  </div>
                  <div className="row-flex">
                    <p className="tel1">Điện thoại:</p>
                    <p>0778895138</p>
                  </div>
                </div>
                <div className="edit-text">Chỉnh sửa</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default AddressBook;
