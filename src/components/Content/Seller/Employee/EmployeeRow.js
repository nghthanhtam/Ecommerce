import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEmployee } from "../../../../state/actions/employeeActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class EmployeeRow extends Component {
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

    return year + "-" + month + "-" + dt;
  };

  handleEdit = (id) => {
    this.props.pushHistory(`/seller/employee/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    const { employee, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{employee.username}</td>
        <td>{employee.EmployeeRole.name}</td>
        <td>{employee.fullname}</td>
        <td>{employee.phone}</td>
        {!employee.deletedAt && (
          <td>
            <div className="btn-group">
              <button
                onClick={() => this.handleEdit(employee.id)}
                type="button"
                className="btn btn-success"
              >
                Sửa
              </button>

              <button
                onClick={() => this.handleDelete(employee.id)}
                type="button"
                className="btn btn-danger"
              >
                Xóa
              </button>
            </div>
          </td>
        )}
      </tr>
    );
  }
}

export default connect(null, { deleteEmployee, pushHistory })(EmployeeRow);
