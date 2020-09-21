import React from "react";
import "../../../../assets/css/category.css";
import { Link } from "react-router-dom";

class Category extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    let { cate } = this.props;
    return (
      <div className="wrapper">
        <div className="card">
          <img src={cate.picLink} alt="blue" />
          <div className="info-cate">
            <h3>{cate.name}</h3>
            <p>{cate.description}</p>
            <Link className="btn">See more </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
