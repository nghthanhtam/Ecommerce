import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../../../state/actions/productActions";
import { pushHistory } from "../../../../state/actions/historyActions";

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
  componentDidMount() {
    console.log(this.props.selectedReport);
    console.log(this.props.report);
  }

  render() {
    const { report, selectedReport, selectedYear } = this.props;
    return (
      <tr>
        {selectedReport === "SALE_SUMMARY" && (
          <>
            <td>
              {report.month}/{selectedYear}
            </td>
            <td>{report.total}</td>
            <td>{report.totalUsers}</td>
            <td>{report.totalProductVars}</td>
            <td>{report.shippingFee}</td>
            <td>{report.totalDiscount}</td>
            <td>{report.totalAmountMoney}</td>
          </>
        )}
        {selectedReport === "WEEKDAY" ? <td> {report.day}</td> : null}
        {selectedReport === "HOUR" ? <td> {report.hour}</td> : null}

        {selectedReport === "CITY" && (
          <>
            <td> {report.city}</td>
            <td>{report.data.orders.length}</td>
            <td>{report.data.totalUsers}</td>
            <td>{report.data.totalProductVars}</td>
            <td>{report.data.shippingFee}</td>
            <td>{report.data.totalDiscount}</td>
            <td>{report.data.totalAmountMoney}</td>
          </>
        )}
      </tr>
    );
  }
}

export default connect(null, { deleteProduct, pushHistory })(ReportRow);
