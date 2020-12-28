import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteRoleAdmin } from "../../../../state/actions/roleAdminActions";
import { pushHistory } from "../../../../state/actions/historyActions";

const mapStateToProps = (state) => ({
  permissions: state.auth.permissions,
});

class ARoleRow extends Component {
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
    this.props.pushHistory(`/admin/role/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteRoleAdmin(id);
  };

  render() {
    const { role, index, permissions } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{role.name}</td>
        <td>{this.convertDate(role.createdAt)}</td>
        {permissions.includes("editRole") &&
          permissions.includes("deleteRole") && (
            <td>
              <div className="btn-group">
                {permissions.includes("editRole") && (
                  <button
                    onClick={() => this.handleEdit(role.id)}
                    type="button"
                    className="btn btn-success"
                  >
                    Chỉnh sửa
                  </button>
                )}
                {permissions.includes("deleteRole") && (
                  <button
                    onClick={() => this.handleDelete(role.id)}
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

export default connect(mapStateToProps, { deleteRoleAdmin, pushHistory })(
  ARoleRow
);
