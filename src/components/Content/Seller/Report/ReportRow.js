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
  }

  render() {
    const { report, selectedReport, selectedYear } = this.props;
    return (
      <tr>
        {selectedReport === "SALE_SUMMARY" ? (
          <td>
            {/* {report.month}/{report.year} */}
            {report.month}/{selectedYear}
          </td>
        ) : null}
        {selectedReport === "WEEKDAY" ? <td> {report.day}</td> : null}
        {selectedReport === "CITY" ? <td> {report.city}</td> : null}
        {selectedReport === "HOUR" ? <td> {report.hour}</td> : null}
        <td>{report.total}</td>
        <td>{report.totalUsers}</td>
        <td>{report.totalProductVars}</td>
        <td>{report.shippingFee}</td>
        <td>{report.totalDiscount}</td>
        <td>{report.totalAmountMoney}</td>
      </tr>
    );
  }
}

export default connect(null, { deleteProduct, pushHistory })(ReportRow);
