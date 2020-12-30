import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAdmin } from "../../../../state/actions/adminActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class AdminRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "-" + month + "-" + year;
  };

  handleEdit = (id) => {
    this.props.pushHistory(`/seller/admin/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteAdmin(id);
  };

  render() {
    const { admin, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{admin.username}</td>
        <td>{admin.idRole}</td>
        <td>{admin.fullname}</td>
        <td>{admin.phone}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(admin.id)}
              type="button"
              className="btn btn-success"
            >
              Sửa
            </button>

            <button
              onClick={() => this.handleDelete(admin.id)}
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

export default connect(null, { deleteAdmin, pushHistory })(AdminRow);
