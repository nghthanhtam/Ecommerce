import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../../../state/actions/modalActions";
import { updateOrder } from "../../../../state/actions/orderActions";
import "./order.css";

const mapStateToProps = (state) => ({
  history: state.history.history,
  idShop: state.auth.role.idShop,
});

class OrderRow extends Component {
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

  handleAction = (e, item) => {
    const { status, id } = this.props.order;
    const { pages, idShop } = this.props;
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
        return;
      }

      this.props.updateOrder({
        id,
        status: item.value,
        pages,
        idShop,
      });
    }
  };

  render() {
    const {
      totalAmount,
      Purchase,
      status,
      id,
      Ward,
      District,
      City,
    } = this.props.order;
    const { statuses } = this.state;

    return (
      <tr>
        <td
          onClick={() =>
            this.props.history.push({
              pathname: `/seller/order/edit/${id}`,
              totalAmount,
            })
          }
          style={{ color: "blue", cursor: "pointer" }}
        >
          #{id}
        </td>
        <td>{Purchase.recipient}</td>
        <td>{Purchase.phone}</td>
        <td>
          {Purchase.numberAndStreet +
            ", " +
            Ward.ward +
            ", " +
            District.district +
            ", " +
            City.city}
        </td>
        <td>{totalAmount}</td>
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
        {status == "received" || status == "canceled" ? null : (
          <td>
            {status !== "canceled" && status !== "delivered" && (
              <div className="btn-group">
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
                        status == item.value
                          ? "disabled-link"
                          : ""
                      }
                      onClick={(e) => this.handleAction(e, item)}
                    >
                      <a href="javascript:void(0);"> {item.label} </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </td>
        )}
      </tr>
    );
  }
}

export default connect(mapStateToProps, { showModal, updateOrder })(OrderRow);
