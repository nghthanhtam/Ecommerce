import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePayslip } from "../../../../state/actions/payslipActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class PayslipRow extends Component {
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
    this.props.pushHistory(`/admin/payslip/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deletePayslip(id);
  };

  handleEmpDetails = (id) => {
    this.props.pushHistory(`/admin/employee/payslip/${id}`);
  };

  render() {
    const { payslip, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{payslip.name}</td>
        <td>{payslip.busLicenseId}</td>
        <td>{payslip.city}</td>
        <td>{payslip.url}</td>
        <td>{payslip.phone}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(payslip.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(payslip.id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
            </button>

            <button
              onClick={() => this.handleEmpDetails(payslip.id)}
              type="button"
              className="btn btn-info"
            >
              Nhân viên
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deletePayslip, pushHistory })(PayslipRow);
