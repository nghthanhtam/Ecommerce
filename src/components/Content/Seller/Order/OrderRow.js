import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../../../state/actions/orderActions';
import { showModal } from '../../../../state/actions/modalActions';
import './order.css'

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class OrderRow extends Component {
  state = {
    statuses: [
      { value: "received", label: 'Đã tiếp nhận' },
      { value: "in transit", label: 'Đang giao hàng' },
      { value: "delivered", label: 'Đã nhận hàng' },
      { value: "canceled", label: 'Đã hủy' },
    ],
    disabledState: ''
  }

  convertDate = (date) => {
    const newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let dt = newDate.getDate();

    dt = dt < 10 ? `0${dt}` : dt;

    month = month < 10 ? `0${month}` : month;

    return year + '-' + month + '-' + dt;
  };

  handleEdit = (id) => {
    this.props.history.push(`/seller/order/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    const { totalPrice, recipient, phone, numberAndStreet, createdAt, status, cancelReason, id, Ward, District, City } = this.props.order
    const { statuses } = this.state

    return (
      <tr>
        <td onClick={() => this.props.history.push(`/seller/order/edit/${id}`)}
          style={{ color: 'blue', cursor: 'pointer' }}>#{id}
        </td>
        <td>{recipient}</td>
        <td>{phone}</td>
        <td>{numberAndStreet + ', ' + Ward.ward + ', ' + District.district + ', ' + City.city}</td>
        <td>{totalPrice}</td>
        <td>{this.convertDate(createdAt)}</td>
        <td >{status == 'pending' ? 'Đang xử lý' : (status == 'in transit' ? 'Đang giao hàng' : (status == 'delivered' ? 'Đã nhận hàng' : (status == 'received' ? 'Đã tiếp nhận' : 'Đã hủy')))}</td>
        <td>{cancelReason}</td>

        <td>
          {status !== 'canceled' && status !== 'delivered' &&
            <div className="btn-group">
              <button type="button" className="btn btn-info">Duyệt</button>
              <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {statuses.map((item, index) => (
                  <li key={index} className={(status == 'in transit' && item.value == 'recieved')
                    || (status !== 'pending' && item.value == 'canceled') || (status == item.value) ? 'disabled-link' : ''}
                    onClick={() => {
                      this.props.updateOrder({ id, status: item.value });
                      window.location.reload()
                    }}><a href="#"> {item.label} </a></li>
                ))}
              </ul>
            </div>}
        </td>
      </tr >
    );
  }
}

export default connect(mapStateToProps, { updateOrder, showModal })(OrderRow);
