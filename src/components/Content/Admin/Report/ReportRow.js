import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../../../actions/productActions";
import { pushHistory } from "../../../../actions/historyActions";

class ReportRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;

    return year + "-" + month + "-" + dt;
  };
  handleEdit = (id) => {
    this.props.pushHistory(`/payslip/edit/${id}`);
  };
  handleDelete = (id) => {
    this.props.deletePaySlip(id);
  };

  render() {
    const { product, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.idMember}</td>
        <td>{product.idSupplier}</td>
        <td>{this.convertDate(product.createddate)}</td>
        <td>{product.totalAmt}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(product._id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(product._id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteProduct, pushHistory })(ReportRow);
