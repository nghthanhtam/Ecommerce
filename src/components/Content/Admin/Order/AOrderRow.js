import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../../../state/actions/modalActions";
import {
  updateOrder,
  deletePromotionInfor,
} from "../../../../state/actions/orderActions";

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class AOrderRow extends Component {
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
    const { status, id } = this.props.order;
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
            pages: this.props.pages,
            order: this.props.order,
            type: "seller",
          },
        });
      } else {
        this.props.updateOrder({
          id,
          status: item.value,
          pages: this.props.pages,
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
      shippingFee,
      Purchase,
      Ward,
      District,
      City,
      totalAmount,
    } = this.props.order;
    const { statuses } = this.state;

    return (
      <tr>
        <td
          onClick={() =>
            this.props.history.push({
              pathname: `/seller/order/edit/${id}`,
              //totalAmount,
              totalAmount: 20000,
            })
          }
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{id}
        </td>
        <td>{Purchase.recipient}</td>
        <td>{Purchase.phone}</td>
        <td>
          {" "}
          {Purchase.numberAndStreet +
            ", " +
            Ward.ward +
            ", " +
            District.district +
            ", " +
            City.city}
        </td>
        <td>{this.convertPrice(totalAmount)}đ</td>
        <td>{this.convertDate(createdAt)}</td>
        <td>{this.convertPrice(shippingFee)}đ</td>
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
                {statuses.map((item, index) => (
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
                <li
                  onClick={(e) =>
                    this.props.showModal({
                      show: true,
                      modalName: "modalShippingFee",
                      details: {
                        id,
                        type: "seller",
                        createdAt,
                        pages: this.props.pages,
                      },
                    })
                  }
                >
                  <a href="javascript:void(0);"> Cập nhật phí vận chuyển </a>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.deletePromotionInfor(id)}
              >
                Xóa mã giảm giá
              </button>
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
})(AOrderRow);
