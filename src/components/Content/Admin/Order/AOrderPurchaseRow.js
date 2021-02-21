import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../../../state/actions/modalActions";
import {
  updateOrder,
  deletePromotionInfor,
} from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
  permissionAdmins: state.authAdmin.permissions,
});

class AOrderPurchaseRow extends Component {
  state = {
    statuses: [
      { value: "received", label: "Đã tiếp nhận" },
      // { value: "in transit", label: "Đang giao hàng" },
      // { value: "delivered", label: "Đã nhận hàng" },
      { value: "canceled", label: "Hủy đơn" },
    ],
    disabledState: "",
  };

  convertDate = (date) => {
    if (!date) return "Chưa cập nhật";
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;
    month = month < 10 ? `0${month}` : month;
    return dt + "/" + month + "/" + year;
  };

  handleAction = (e, item) => {
    const { status, id } = this.props.order,
      { idPurchase, order } = this.props;
    if (
      (status == "in transit" && item.value == "received") ||
      status == item.value
    )
      e.stopPropagation();
    else {
      if (item.value == "canceled") {
        this.props.showModal({
          show: true,
          modalName: "modalCancel",
          details: {
            order,
            type: "admin",
          },
        });
      } else {
        this.props.updateOrder({
          idPurchase,
          id,
          status: item.value,
          type: "admin",
        });
      }
    }
  };

  convertPrice = (value) => {
    if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return 0;
  };

  deletePromotionInfor = (idOrder) => {
    this.props.deletePromotionInfor(idOrder);
  };

  render() {
    const {
      createdAt,
      status,
      cancelReason,
      id,
      idShop,
      shippingFee,
    } = this.props.order;
    const { statuses } = this.state;
    return (
      <tr>
        <td
          onClick={() =>
            this.props.history.push({
              pathname: `/admin/order/details/${id}`,
            })
          }
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{id}
        </td>
        <td
          onClick={() =>
            this.props.history.push({
              pathname: "/admin/shop/edit",
              search: `?id=${idShop}`,
            })
          }
          style={{ color: "blue", cursor: "pointer" }}
        >
          {idShop}
        </td>
        <td>{this.convertDate(createdAt)}</td>
        <td>
          {status == "pending"
            ? "Đang xử lý"
            : status == "in transit"
            ? "Đang giao hàng"
            : status == "delivered"
            ? "Đã nhận hàng"
            : status == "received"
            ? "Đã tiếp nhận"
            : "Đã hủy"}
        </td>
        <td>{this.convertPrice(shippingFee)}</td>
        <td>{cancelReason}</td>
        {status == "delivered" || status == "canceled" ? null : (
          <td>
            <div className="btn-group" style={{ display: "flex" }}>
              <button type="button" className="btn btn-info">
                Duyệt
              </button>
              <button
                type="button"
                className="btn btn-info dropdown-toggle"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {this.props.permissionAdmins.includes("updateOrderStatus") &&
                  statuses.map((item, index) => (
                    <li
                      key={index}
                      className={
                        (status == "in transit" && item.value == "received") ||
                        status == item.value ||
                        (status !== "pending" && item.value == "canceled")
                          ? "disabled-link"
                          : ""
                      }
                      onClick={(e) => this.handleAction(e, item)}
                    >
                      <a href="javascript:void(0);"> {item.label} </a>
                    </li>
                  ))}

                {this.props.permissionAdmins.includes(
                  "updateOrderShippingInformation"
                ) && (
                  <li
                    onClick={(e) =>
                      this.props.showModal({
                        show: true,
                        modalName: "modalShippingFee",
                        details: {
                          id,
                          type: "admin",
                          createdAt,
                          idPurchase: this.props.idPurchase,
                        },
                      })
                    }
                  >
                    <a href="javascript:void(0);">
                      {" "}
                      Cập nhật thông tin giao hàng{" "}
                    </a>
                  </li>
                )}
              </ul>
              {this.props.permissionAdmins.includes(
                "deleteOrderPromotionInfo"
              ) && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.deletePromotionInfor(id)}
                >
                  Xóa mã giảm giá
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }
}

export default connect(mapStateToProps, {
  showModal,
  updateOrder,
  deletePromotionInfor,
})(AOrderPurchaseRow);
