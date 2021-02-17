import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEmployee } from "../../../../state/actions/employeeActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  permissions: state.auth.permissions,
});
class EmployeeRow extends Component {
  handleEdit = (id) => {
    this.props.pushHistory(`/seller/employee/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    const { employee, index, permissions } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{employee.username}</td>
        <td>{employee.EmployeeRole.name}</td>
        <td>{employee.fullname}</td>
        <td>{employee.phone}</td>
        {!employee.deletedAt &&
          (permissions.includes("editEmployee") ||
            permissions.includes("deleteEmployee")) && (
            <td>
              <div className="btn-group">
                {permissions.includes("editEmployee") && (
                  <button
                    onClick={() => this.handleEdit(employee.id)}
                    type="button"
                    className="btn btn-success"
                  >
                    Sửa
                  </button>
                )}
                {permissions.includes("deleteEmployee") && (
                  <button
                    onClick={() => this.handleDelete(employee.id)}
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

export default connect(mapStateToProps, { deleteEmployee, pushHistory })(
  EmployeeRow
);
