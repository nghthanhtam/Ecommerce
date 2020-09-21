import React from "react";
import "../../../../assets/css/title-pane.css";
import { Link } from "react-router-dom";

class TitlePane extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentDidMount = () => {};
  render() {
    let { title, isNotShop } = this.props;
    return (
      <div className="outer-wrapper">
        <div className="pane-wrapper">
          <div className="line"></div>
          <div className="title">
            <h3>{title}</h3>
          </div>
          <div className="line"></div>
        </div>
        {!isNotShop ? (
          <Link to="./product-list" className="text">
            Shop Now
          </Link>
        ) : null}
      </div>
    );
  }
}

export default TitlePane;
