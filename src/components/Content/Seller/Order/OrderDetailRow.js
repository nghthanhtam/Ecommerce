import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';
class OrderRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;
    // if (month < 10) {
    //   month = "0" + month;
    // }

    return year + '-' + month + '-' + dt;
  };
  handleEdit = (id) => {
    this.props.pushHistory(`/order/edit/${id}`);
  };
  handleDelete = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    const { employee, index } = this.props;

    return (
      <tr
        style={{
          fontWeight: employee.status == 'U' ? '700' : '0',
          color: '#0d1136',
        }}
      >
        <td>{index + 1}</td>
        <td>{employee.username}</td>
        {/* <td>{this.convertDate(employee.createAt)}</td> */}
        <td>{employee.idRole}</td>
        <td>{employee.fullname}</td>
        <td>{employee.phone}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(employee.id)}
              type="button"
              className="btn btn-default"
            >
              Xem chi tiết
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { pushHistory })(OrderRow);
