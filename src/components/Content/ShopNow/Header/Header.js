import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      header: "header",
      left: 0,
      hideSearchBar: "hidden",
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
      this.setState({ hideSearchBar: "visible" });
    } else {
      this.setState({ header: "header" });
      this.setState({ hideSearchBar: "hidden" });
    }
    this.setState({
      left: (-window.scrollY * 0.5).toString() + "px",
    });
  };

  render() {
    let { hideSearchBar } = this.state;
    return (
      <div className={this.state.header}>
        <Link className="logo" to="/home">
          Logo
        </Link>
        <div
          className="searchbar"
          style={{
            width: "50%",
            height: "50px",
            visibility: hideSearchBar,
          }}
          class="ui action input"
        >
          <button
            style={{ background: "#f5f5f5", borderRadius: "0 0 0 0" }}
            class="ui icon button"
          >
            <i class="search icon"></i>
          </button>
          <input
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "0 20% 20% 0",
            }}
            type="text"
            placeholder="Search..."
          />
        </div>
        <ul className="row-flex-center">
          <li>
            <Link className="item" to="/">
              Need Help
            </Link>
          </li>
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
