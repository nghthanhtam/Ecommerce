import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../assets/css/user-profile.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";
import UserProfile from "./UserProfile";

class Account extends React.Component {
  constructor(props) {
    super();
    this.state = {
      header: "header",
      picLink: "./img/blue.png",
      section: "section-blue",
      left: 0,
      productList: [1, 2, 3, 4, 5, 6, 7, 8],
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
    let { productList } = this.state;
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
            <UserProfile selectedLink="/shopnow/user/review" />

            <div className="review-container">
              <div className="row-flex">
                <div className="grid-review">
                  {productList.map((item, index) => {
                    return <Product key={index} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Account;
