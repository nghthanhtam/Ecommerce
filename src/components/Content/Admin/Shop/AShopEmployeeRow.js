import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAdmin } from "../../../../state/actions/adminActions";
import { pushHistory } from "../../../../state/actions/historyActions";

class AShopEmployeeRow extends Component {
  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return year + "-" + month + "-" + dt;
  };

  handleEdit = (id, idShop) => {
    this.props.pushHistory({
      pathname: `/admin/employee/shop/edit/${id}`,
      idShop,
    });
  };

  handleDelete = (id) => {
    this.props.deleteAdmin(id);
  };

  render() {
    const { employee, index, idShop } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{employee.username}</td>
        <td>{employee.idRole}</td>
        <td>{employee.fullname}</td>
        <td>{employee.phone}</td>
        <td>
          <div className="btn-group">
            <button
              onClick={() => this.handleEdit(employee.id, idShop)}
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
      </tr>
    );
  }
}

export default connect(null, { deleteAdmin, pushHistory })(AShopEmployeeRow);
