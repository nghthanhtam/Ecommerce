import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../../../state/actions/modalActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  permissionAdmins: state.authAdmin.permissions,
});

class APurchaseRow extends Component {
  state = {
    statuses: [
      { value: "received", label: "Đã tiếp nhận" },
      { value: "in transit", label: "Đang giao hàng" },
      { value: "delivered", label: "Đã nhận hàng" },
      { value: "canceled", label: "Hủy đơn" },
    ],
    disabledState: "",
  };

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();
    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  render() {
    const {
      numberAndStreet,
      recipient,
      phone,
      status,
      createdAt,
      id,
    } = this.props.purchase;
    const { permissionAdmins } = this.props;
    return (
      <tr>
        <td
          onClick={() => {
            if (permissionAdmins && permissionAdmins.includes("getOrders"))
              this.props.history.push({
                pathname: `/admin/order/purchase/${id}`,
              });
          }}
          className={
            permissionAdmins &&
            permissionAdmins.includes("getOrders") &&
            "order-link"
          }
        >
          #{id}
        </td>
        <td>{recipient}</td>
        <td>{phone}</td>
        <td>{numberAndStreet}</td>
        <td>{this.convertDate(createdAt)}</td>
        <td>
          {status == "warning"
            ? "Cần xử lý"
            : status == "canceled"
            ? "Đã hủy"
            : "Đã nhận hàng"}
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, { showModal })(APurchaseRow);
