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
  state = {
    statuses: [
      { value: "active", label: "Duyệt" },
      { value: "declined", label: "Không duyệt" },
      { value: "photoCheck", label: "Xem danh sách ảnh" },
    ],
  };

  approve = (status) => {
    const { productVar, pages } = this.props;
    let newProductVar = {
      ...productVar,
      status,
      pages,
    };
    this.props.updateProductVarStatus(newProductVar);
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
    const { statuses } = this.state;

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
          </td>
          <td>{name}</td>
          <td>{SKU}</td>
          <td>{this.convertPrice(price)}đ</td>
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
                  <button type="button" className="btn btn-info">
                    Thao tác
                  </button>
                  <button
                    type="button"
                    className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    {statuses.map((s, index) => (
                      <li key={index} onClick={() => this.approve(s.value)}>
                        <a href="javascript:void(0);"> {s.label} </a>
                      </li>
                    ))}
                  </ul>
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
