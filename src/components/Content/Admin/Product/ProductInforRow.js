import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../../../state/actions/productActions";
import { updateProductStatus } from "../../../../state/actions/productActions";
import { showModal } from "../../../../state/actions/modalActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class ProductRow extends Component {
  state = {
    statuses: [
      { value: "accepted", label: "Duyệt" },
      { value: "declined", label: "Không duyệt" },
      { value: "details", label: "Xem chi tiết" },
    ],
  };

  chooseAction = (id, status) => {
    const { pages, showModal, product } = this.props;
    pages.arrayStatus = ["pending"];
    if (status.value == "details")
      showModal({
        show: true,
        modalName: "productDetails",
        details: {
          data: product.Details,
          productCateName: product.ProductCat.name,
          brand: product.brand,
        },
      });
    else this.props.updateProductStatus({ id, status: status.value, pages });
  };

  render() {
    const { id, name, idShop, brand, status, Movie } = this.props.product;
    const { index } = this.props;
    const { statuses } = this.state;

    return (
      <Fragment>
        <tr>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{brand}</td>
          <td>{Movie.name}</td>
          {status == "pending" ? (
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
                      <li key={index} onClick={() => this.chooseAction(id, s)}>
                        <a href="javascript:void(0);"> {s.label} </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
            </>
          ) : (
            <>
              <td>Đã duyệt</td>
              <td>
                <div className="btn-group">
                  <button
                    onClick={() =>
                      this.props.history.push({
                        pathname: `/admin/product/edit/${id}`,
                      })
                    }
                    type="button"
                    className="btn btn-success"
                  >
                    Sửa
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
  updateProductStatus,
  showModal,
})(ProductRow);
