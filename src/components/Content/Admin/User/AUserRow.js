import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../../../state/actions/userActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class AUserRow extends Component {
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
    this.props.pushHistory(`/admin/user/edit/${id}`);
  };

  // handleDelete = (id) => {
  //   this.props.deleteUser(id);
  // };

  render() {
    const { user, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{user.username}</td>
        <td>{user.fullname}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(user.id)}
              type="button"
              className="btn btn-success"
            >
              Chỉnh sửa
            </button>

            {/* <button
              onClick={() => this.handleDelete(user.id)}
              type="button"
              className="btn btn-danger"
            >
              Xóa
            </button> */}
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteUser, pushHistory })(AUserRow);
