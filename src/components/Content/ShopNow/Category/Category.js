import React from "react";
import "../../../../assets/css/category.css";
import { pushHistory } from '../../../../state/actions/historyActions';
import { connect } from 'react-redux';
import { Link, Route } from "react-router-dom";
import { getProductsByMovieCate } from "../../../../state/actions/productActions"
import ProductList from '../Product/ProductList';

class Category extends React.Component {
  componentDidMount() {

  }

  render() {
    let { cate } = this.props;
    return (
      <div className="wrapper">
        <div className="card">
          <img src={cate.imageUrl} alt="blue" />
          <div className="info-cate">
            <h3>{cate.name}</h3>
            <p>{cate.description}</p>
            <Link to={{ pathname: `./shopnow/product-list/idMovieCat/${cate.id}` }} className="btn">Xem thêm </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { pushHistory })(Category);