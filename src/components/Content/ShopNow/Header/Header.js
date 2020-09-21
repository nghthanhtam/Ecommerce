import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      header: "header",
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
      <div className={this.state.header}>
        <Link className="logo" to="/home">
          Logo
        </Link>
        <ul className="row-flex-center  ">
          <li>
            <Link
              className="item"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0d1136",
                padding: "8px",
                borderRadius: "7px",
              }}
              to="/checkout/cart"
            >
              <div style={{ color: "white" }}>Cart</div>
              <div>
                <div
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                    width: "17px",
                    height: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                >
                  1
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link className="item" to="/">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
