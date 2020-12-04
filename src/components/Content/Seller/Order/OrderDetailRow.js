import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushHistory } from '../../../../state/actions/historyActions';

const mapStateToProps = (state) => ({
  history: state.history.history,
});

class OrderRow extends Component {
  convertPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  handleEdit = (id) => {
    this.props.pushHistory(`/order/edit/${id}`);
  };

  handleDelete = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    const { orderDet, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{orderDet.SKU}</td>
        <td><img src={orderDet.Images[0].url} alt="hình ảnh" border='4' height='100' width='80' /></td>
        <td>{orderDet.name}</td>
        <td>{this.convertPrice(orderDet.priceWhenBuy)}</td>
        <td>{orderDet.quantity}</td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, { pushHistory, })(OrderRow);
