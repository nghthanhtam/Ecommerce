import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePayslip } from "../../../../state/actions/payslipActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  permissions: state.auth.permissions,
});

class PayslipRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  handleEdit = (id) => {
    this.props.history.push({
      pathname: "/seller/payslip/edit",
      search: `?id=${id}`,
    });
  };

  handleDelete = (id) => {
    this.props.deletePayslip(id);
  };

  render() {
    const { payslip, index, history, permissions } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() =>
            history.push(`/seller/employee/edit/${payslip.idEmployee}`)
          }
        >
          {payslip.idEmployee}
        </td>
        <td>{payslip.CostType.name}</td>
        <td>{payslip.title}</td>
        <td>{this.convertPrice(payslip.totalAmount)}đ</td>
        <td>{this.convertDate(payslip.createdAt)}</td>
        {!permissions.includes("editPayslip") &&
        !permissions.includes("deletePayslip") ? null : (
          <td>
            <div className="btn-group">
              {permissions.includes("editPayslip") && (
                <button
                  onClick={() => this.handleEdit(payslip.id)}
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              )}
              {permissions.includes("deletePayslip") && (
                <button
                  onClick={() => this.handleDelete(payslip.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Xóa
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }
}

export default connect(mapStateToProps, { deletePayslip, pushHistory })(
  PayslipRow
);
