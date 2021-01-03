import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../../../state/actions/productActions";
import { updateProductVarStatus } from "../../../../state/actions/productVarActions";
import { showModal } from "../../../../state/actions/modalActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class ProductRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + "-" + month + "-" + dt;
  };

  approve = () => {
    const { productVar, pages } = this.props;
    productVar = {
      ...productVar,
      status: "active",
      pages,
    };
    this.props.updateProductVarStatus(productVar);
  };

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const {
      name,
      SKU,
      price,
      id,
      status,
      idShop,
      Images,
    } = this.props.productVar;
    const { index } = this.props;

    return (
      <Fragment>
        <tr>
          <td>{index + 1}</td>
          <td>
            <img
              src={Images[0].url}
              alt=""
              border="3"
              height="200px"
              width="200px"
            />{" "}
            {SKU}
          </td>
          <td>{name}</td>
          <td>{SKU}</td>
          <td>{this.convertPrice(price)} VND</td>
          <td>{idShop}</td>

          {(status == "active" || status == "inactive") && (
            <td>
              <div className="btn-group">
                <button
                  onClick={() =>
                    this.props.history.push({
                      pathname: `/admin/productvar/edit/${id}`,
                    })
                  }
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              </div>
            </td>
          )}

          {status == "pending" && (
            <>
              <td style={{ color: "grey" }}>
                <i
                  style={{ color: "#52c41a" }}
                  className="fa fa-spinner"
                  aria-hidden="true"
                ></i>{" "}
                Chờ duyệt
              </td>
              <td>
                <div className="btn-group">
                  <button
                    onClick={() => this.approve()}
                    type="button"
                    className="btn btn-success"
                  >
                    Duyệt
                  </button>
                </div>
              </td>
            </>
          )}
        </tr>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, {
  deleteProduct,
  pushHistory,
  updateProductVarStatus,
  showModal,
})(ProductRow);
