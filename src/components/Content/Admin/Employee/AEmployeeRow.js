import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAdmin } from "../../../../state/actions/adminActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  permissionAdmins: state.authAdmin.permissions,
});

class AEmployeeRow extends Component {
  handleEdit = (id) => {
    this.props.pushHistory(`/admin/employee/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteAdmin(id);
  };

  render() {
    const { admin, index, permissionAdmins } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{admin.username}</td>
        <td>{admin.idRole}</td>
        <td>{admin.fullname}</td>
        <td>{admin.phone}</td>
        {(permissionAdmins.includes("editAdmin") ||
          permissionAdmins.includes("deleteAdmin")) && (
          <td>
            <div className="btn-group">
              {permissionAdmins.includes("editAdmin") && (
                <button
                  onClick={() => this.handleEdit(admin.id)}
                  type="button"
                  className="btn btn-success"
                >
                  Sửa
                </button>
              )}
              {permissionAdmins.includes("deleteAdmin") && (
                <button
                  onClick={() => this.handleDelete(admin.id)}
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

export default connect(mapStateToProps, { deleteAdmin, pushHistory })(
  AEmployeeRow
);
