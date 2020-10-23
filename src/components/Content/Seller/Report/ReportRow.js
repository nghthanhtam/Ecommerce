import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../../state/actions/productActions';
import { pushHistory } from '../../../../state/actions/historyActions';

class ReportRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;

    return year + '-' + month + '-' + dt;
  };
  handleEdit = (id) => {
    this.props.pushHistory(`/payslip/edit/${id}`);
  };
  handleDelete = (id) => {
    this.props.deletePaySlip(id);
  };

  render() {
    const { record, reportData } = this.props;

    return (
      <tr>
        {reportData === 'SALE_SUMMARY' ? (
          <td>
            {record.month}/{record.year}
          </td>
        ) : null}
        {reportData === 'WEEKDAY' ? <td> {record.day}</td> : null}
        {reportData === 'CITY' ? <td> {record.city}</td> : null}
        {reportData === 'HOUR' ? <td> {record.hour}</td> : null}
        <td>{record.orderTotal}</td>
        <td>{record.customerTotal}</td>
        <td>{record.productTotal}</td>
        <td>{record.shippingTotal}</td>
        <td>{record.promotionTotal}</td>
        <td>{record.total}</td>
        <td>{record.totalRefund}</td>
      </tr>
    );
  }
}

export default connect(null, { deleteProduct, pushHistory })(ReportRow);
