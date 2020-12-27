import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteRole } from "../../../../state/actions/roleActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class RoleRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return dt + "-" + month + "-" + year;
  };

  handleEdit = (id) => {
    this.props.pushHistory(`/seller/role/edit/${id}`);
  };

  handleDelete = (id) => {
    // console.log(id);
    this.props.deleteRole(id);
  };

  render() {
    const { role, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{role.name}</td>
        <td>{this.convertDate(role.createdAt)}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(role.id)}
              type="button"
              className="btn btn-success"
            >
              Chỉnh sửa
            </button>

            <button
              onClick={() => this.handleDelete(role.id)}
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

export default connect(null, { deleteRole, pushHistory })(RoleRow);
