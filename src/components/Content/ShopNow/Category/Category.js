import React from "react";
import "../../../../assets/css/category.css";
import { pushHistory } from "../../../../state/actions/historyActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Category extends React.Component {
  render() {
    let { cate } = this.props;
    return (
      <div className="cate-wrapper">
        <div className="card">
          <img src={cate.imageUrl} alt="photo" />
          <div className="info-cate">
            <h3>{cate.name}</h3>
            <p>{cate.description}</p>
            <Link
              // to={{ pathname: `./shopnow/product-list/idMovieCat/${cate.id}` }}
              to={{
                pathname: "/shopnow/search",
                search: `?movieCategory=${cate.id}`,
              }}
              className="btn"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { pushHistory })(Category);
